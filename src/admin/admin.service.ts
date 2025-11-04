import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  private admins: any[] = []; // in-memory storage for simplicity

  create(createAdminDto: CreateAdminDto) {
    const admin = { id: Date.now().toString(), ...createAdminDto };
    this.admins.push(admin);
    return { message: 'Admin created', data: admin };
  }

  findAll(role?: string) {
    if (role) {
      return { admins: this.admins.filter(a => a.role === role) };
    }
    return { admins: this.admins };
  }

  findOne(id: string) {
    return this.admins.find(a => a.id === id) || { message: 'Admin not found' };
  }

  update(id: string, updateAdminDto: CreateAdminDto) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    Object.assign(admin, updateAdminDto);
    return { message: 'Admin updated', data: admin };
  }

  partialUpdate(id: string, partialAdminDto: Partial<CreateAdminDto>) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    Object.assign(admin, partialAdminDto);
    return { message: 'Admin partially updated', data: admin };
  }

  remove(id: string) {
    const index = this.admins.findIndex(a => a.id === id);
    if (index === -1) return { message: 'Admin not found' };
    this.admins.splice(index, 1);
    return { message: `Admin ${id} removed` };
  }

  getPermissions(id: string) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    return { id, permissions: ['read', 'write'] };
  }

  assignRole(id: string, role: string) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    admin.role = role;
    return { message: 'Role assigned', id, role };
  }
}

implement admin module with CRUD operations and DTO