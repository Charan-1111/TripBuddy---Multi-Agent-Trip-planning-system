from server import Application

application = Application.initiating()
application.initialize_application()
app = application.app


if __name__ == "__main__":
    application.run_server()