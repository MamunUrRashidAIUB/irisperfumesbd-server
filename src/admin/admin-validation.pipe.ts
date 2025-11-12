import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class AdminValidationPipe implements PipeTransform<any> {
	
	transform(value: any) {
		const errors: string[] = [];

		if (!value || typeof value !== 'object') {
			throw new BadRequestException('Validation failed: request body is missing or not an object');
		}

		const { name, email, nidNumber, nidImage } = value;

		// Name: alphabets and spaces only (at least one letter)
		if (!name || typeof name !== 'string' || !/^[A-Za-z ]+$/.test(name.trim())) {
			errors.push('invalid Name');
		}

		// Email: required and must contain @ and end with .xyz domain
		if (!email || typeof email !== 'string') {
			errors.push('Email is required.');
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i;
			if (!emailRegex.test(email.trim())) {
				errors.push('invalid Email');
			}
		}

		// NID number: digits only, length 10-17 (adjust as necessary for your locale)
		if (!nidNumber || typeof nidNumber !== 'string' || !/^\d{10,17}$/.test(nidNumber.trim())) {
			errors.push('invalid NID Number');
		}

		// NID image size: accept either a File-like object with `size` (bytes) or a base64 data URI string
		// NID image size: only accept Multer-style file object (has `size` in bytes).
		if (nidImage) {
			const maxBytes = 2 * 1024 * 1024; // 2 MB

			// Require a Multer-like file object with a numeric `size` property
			if (typeof nidImage === 'object' && nidImage.size != null) {
				if (typeof nidImage.size !== 'number' || nidImage.size > maxBytes) {
					errors.push('NID image must be no more than 2 MB.');
				}
			} else if (typeof nidImage === 'string') {
				// Plain strings (including base64) are not accepted anymore.
				errors.push('NID image must be uploaded as a multipart/form-data file (multer file), not a base64 string.');
			} else {
				errors.push('NID image format not recognized. Provide a multipart file under the "nidImage" field.');
			}
		}

		if (errors.length) {
			throw new BadRequestException({ message: 'Validation failed', errors });
		}

		return value;
	}
}

export default AdminValidationPipe;

