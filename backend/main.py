from server import Application

application = Application()
application.initialize_application()
app = application.app


if __name__ == "__main__":
    application.run_server()