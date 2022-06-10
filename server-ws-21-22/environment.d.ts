
declare global {
    namespace NodeJS {
        interface Process extends EventEmitter {
            emitWarning(warning: string | Error, name?: string, ctor?: Function): void;
            env: ProcessEnv;
            exit(code?: number): never;
        }

        interface ProcessEnv {
            [key: string]: string | undefined;
        }

        interface ProcessEnv {
            MONGODB_URI: 'mongodb://127.0.0.1:27017/JWTAuthentication?compressors=disabled&gssapiServiceName=mongodb';
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}


// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
