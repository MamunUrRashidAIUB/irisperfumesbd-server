declare module 'bcrypt';
declare module 'jsonwebtoken';
declare module '@nestjs/jwt' {
	export class JwtService {
		sign(payload: any): string;
		// minimal surface used by the project
	}
	export class JwtModule {
		static register(options?: any): any;
	}
}
declare module '@nestjs/passport';
declare module 'passport-jwt';
declare module 'passport';
