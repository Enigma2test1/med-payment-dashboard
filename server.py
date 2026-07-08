import http.server
import socketserver
import os
import sys

PORT = 8999
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class SafeReuseTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == '__main__':
    # Change directory to script location to serve correct files
    os.chdir(DIRECTORY)
    
    start_port = PORT
    max_tries = 20
    httpd = None
    
    for i in range(max_tries):
        port = start_port + i
        # Skip standard ports to avoid overlaps
        if port in [8000, 8080, 8088]:
            continue
        try:
            # Bind specifically to 127.0.0.1 to ensure local access works without IPv6 conflicts
            httpd = SafeReuseTCPServer(("127.0.0.1", port), http.server.SimpleHTTPRequestHandler)
            print(f"Medical Payment Dashboard Server serving at http://127.0.0.1:{port}", flush=True)
            break
        except Exception as e:
            print(f"Port {port} is in use or error: {e}, trying next...", flush=True)
            continue
            
    if httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...", flush=True)
            sys.exit(0)
        except Exception as e:
            print(f"Server execution error: {e}", flush=True)
            sys.exit(1)
        finally:
            httpd.server_close()
    else:
        print("Error: Could not find an available port.", flush=True)
        sys.exit(1)
