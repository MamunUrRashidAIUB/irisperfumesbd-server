import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, UsePipes, ValidationPipe, UploadedFile, UseInterceptors, BadRequestException, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/createDelivery.dto';
import { Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateDeliveryDto) {
    return this.deliveryService.create(dto);
  }

  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.deliveryService.findOne(Number(id));
  }

  @Put(':id/assign')
  assign(@Param('id') id: number, @Body('deliveryPerson') deliveryPerson: string) {
    return this.deliveryService.assignDeliveryPerson(Number(id), deliveryPerson);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.deliveryService.updateStatus(Number(id), status);
  }

  @Patch(':id/location')
  updateLocation(@Param('id') id: number, @Body('currentLocation') currentLocation: string) {
    return this.deliveryService.updateLocation(Number(id), currentLocation);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.deliveryService.findByCustomer(Number(customerId));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(Number(id));
  }

  @Get('filter')
  filterDeliveries(@Query('status') status: string) {
   return this.deliveryService.filterByStatus(status);
 }
 
 /* @Post('uploads')
 @UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: join(process.cwd(), 'src', 'uploads'),
      filename: (req, file, callback) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        callback(null, uniqueName);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (extname(file.originalname) !== '.pdf') {
        return callback(
          new BadRequestException('Only PDF files are allowed!'),
          false,
        );
      }
      callback(null, true)
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
    }),
 )
 uploadFile(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('File upload failed');
  }
  return {
    message: 'File uploaded successfully',
    filename: file.filename,
    size: file.size,
  };
}

@Post('upload-images')
@UseInterceptors(
  FileInterceptor('file', {
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new BadRequestException('Only image files are allowed!'),
          false,
        );
      }
      callback(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 },
  }),
)
uploadImage(@UploadedFile() file: Express.Multer.File) {
  if (!file) throw new BadRequestException('Invalid image file');
  return { message: 'Image uploaded successfully', size: file.size };
}

@Get('file/:filename')
getFile(@Param('filename') filename: string, @Res() res: Response) {
  const filePath = join(process.cwd(), 'src', 'uploads', filename);
  if (!existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }
  return res.sendFile(filePath);
} */



}
