#!/usr/bin/env python
"""
Simple script to run the backend server.
Can be executed from any directory.
"""

import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

if __name__ == '__main__':
    from backend.app import create_app, socketio
    
    app = create_app('development')
    
    print("\n" + "="*60)
    print("🚀 Fasal-sathi Backend Server")
    print("="*60)
    print(f"📍 Server: http://127.0.0.1:5000")
    print(f"📍 Network: http://192.168.1.2:5000")
    print(f"🔧 Debug Mode: ON")
    print(f"📝 Health Check: GET /health")
    print("="*60 + "\n")
    
    socketio.run(
        app,
        host='0.0.0.0',
        port=5000,
        debug=True,
        allow_unsafe_werkzeug=True
    )
