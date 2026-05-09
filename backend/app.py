"""
Main Flask application factory and initialization.
Creates and configures the Flask app with all extensions, blueprints, and middleware.
"""

import os
import sys
from pathlib import Path
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Add parent directory to path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database_config import config
from backend.extensions.database import db, migrate
from backend.extensions.socketio import socketio
from backend.extensions.cache import cache
from backend.extensions.limiter import limiter
from backend.extensions.babel import babel
from backend.extensions.mail import mail
from backend.auth.routes import auth_bp


def create_app(config_name=None):
    """
    Application factory function.
    
    Args:
        config_name: Configuration name ('development', 'production', 'testing')
    
    Returns:
        Flask application instance
    """
    # Determine config to use
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    # Create Flask app
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins="*")
    cache.init_app(app)
    limiter.init_app(app)
    babel.init_app(app)
    mail.init_app(app)
    
    # Initialize JWT
    jwt = JWTManager(app)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register basic blueprints
    app.register_blueprint(auth_bp)
    
    # Register API blueprints only if needed
    @app.before_request
    def register_api_blueprints():
        """Lazy load API blueprints to avoid import cycles."""
        if not hasattr(app, '_api_blueprints_registered'):
            try:
                from backend.api import register_api
                register_api(app)
            except Exception as e:
                app.logger.warning(f"Could not register API blueprints: {e}")
            app._api_blueprints_registered = True
    
    # Setup middleware
    try:
        from backend.middleware.audit import setup_audit_middleware
        setup_audit_middleware(app)
    except Exception as e:
        app.logger.warning(f"Could not setup audit middleware: {e}")
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({'error': 'Access forbidden'}), 403
    
    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({'status': 'healthy', 'service': 'Fasal-sathi-backend'}), 200
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app


if __name__ == '__main__':
    # Create app with development configuration
    app = create_app('development')
    
    # Run with socketio
    socketio.run(
        app,
        host='0.0.0.0',
        port=5000,
        debug=True,
        allow_unsafe_werkzeug=True
    )
