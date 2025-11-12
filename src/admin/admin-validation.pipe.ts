import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class AdminValidationPipe implements PipeTransform<any> {
	
	transform(value: any) {
		const errors: string[] = [];

		if (!value || typeof value !== 'object') {
			throw new BadRequestException('Validation failed: request body is missing or not an object');
		}

		const { name, email, nidNumber, nidImage } = value;

		// Name: alphabets and spaces only at least one letter
		if (!name || typeof name !== 'string' || !/^[A-Za-z ]+$/.test(name.trim())) {
			errors.push('invalid Name');
		}

		// Email: required and must contain @ and end with .xyz domain
		if (!email || typeof email !== 'string') {
			errors.push('Email is required.');
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.xyz$/i;
			if (!emailRegex.test(email.trim())) {
				errors.push('invalid Email');
			}
		}

		
		if (!nidNumber || typeof nidNumber !== 'string' || !/^\d{10,17}$/.test(nidNumber.trim())) {
			errors.push('invalid NID Number');
		}

		
		if (nidImage) {
			const maxBytes = 2 * 1024 * 1024; // 2 MB
	
			if (typeof nidImage === 'object' && nidImage.size != null) {
				if (typeof nidImage.size !== 'number' || nidImage.size > maxBytes) {
					errors.push('file is too large');
				}
			} else if (typeof nidImage === 'string') {
				
				errors.push('file is too');
			} else {
				errors.push('file is too large');
			}
		}

		if (errors.length) {
			throw new BadRequestException({ message: 'file is too large', errors });
		}

		return value;
	}
}

export default AdminValidationPipe;

