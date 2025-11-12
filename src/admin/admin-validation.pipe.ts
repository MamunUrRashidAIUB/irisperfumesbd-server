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
		if (nidImage) {
			const maxBytes = 2 * 1024 * 1024; // 2 MB

			// Multer-like file object
			if (typeof nidImage === 'object' && nidImage.size != null) {
				if (typeof nidImage.size !== 'number' || nidImage.size > maxBytes) {
					errors.push('NID image must be no more than 2 MB.');
				}
			} else if (typeof nidImage === 'string') {
				// data URI: data:[<mediatype>][;base64],<data>
				const match = nidImage.match(/^data:([a-zA-Z0-9/+.-]+\/[^;]+);base64,(.+)$/);
				if (match) {
					try {
						const base64 = match[2];
						const buffer = Buffer.from(base64, 'base64');
						if (buffer.length > maxBytes) {
							errors.push('NID image (base64) must be no more than 2 MB.');
						}
					} catch (e) {
						errors.push('NID image is not a valid base64 data URI.');
					}
				} else {
					// Not a data URI; we cannot determine size reliably. Reject to be safe.
					errors.push('NID image must be a file upload or a base64 data URI string.');
				}
			} else {
				errors.push('NID image format not recognized.');
			}
		}

		if (errors.length) {
			throw new BadRequestException({ message: 'Validation failed', errors });
		}

		return value;
	}
}

export default AdminValidationPipe;

