
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  private admins: any[] = []; // in-memory storage for simplicity
  // simple auto-increment id generator for in-memory storage
  private nextId = 1;

  create(createAdminDto: CreateAdminDto) {
    // generate a small, human-friendly incremental id as a string
    const admin = { id: (this.nextId++).toString(), ...createAdminDto };
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    Object.assign(admin, updateAdminDto);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Admin updated', data: admin };
  }

  partialUpdate(id: string, partialAdminDto: Partial<CreateAdminDto>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const admin = this.admins.find((a) => a.id === id);
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
searchByName(name: string) {
  const found = this.admins.filter(admin =>
    admin.name.toLowerCase().includes(name.toLowerCase())
  );
  if (found.length === 0) return { message: 'Admin not found' };
  return found;
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
