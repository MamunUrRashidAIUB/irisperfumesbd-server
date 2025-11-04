import { CreatePerfumeDto } from './dto/create-seller.dto';
import { Injectable } from '@nestjs/common';
import { UpdatePerfumeDto } from './dto/update-seller.dto';
@Injectable()
export class SellService {
    private perfumes = [];
    private orders = [];

    createPerfume(createPerfumeDto: CreatePerfumeDto) {
        const newPerfume = { id: Date.now(), ...createPerfumeDto };
        this.perfumes.push(newPerfume);
        return { success: true, message: 'perfume added successfully', data: newPerfume };
}

findAllPerfumes(brand?: string) {
    const result = brand
        ? this.perfumes.filter(p => p.brand === brand)
        : this.perfumes;
    return { success: true, data: result };

}

findOnePerfume(id: number) {
    const perfume = this.perfumes.find(p => p.id === id);
    return perfume
        ? { success: true, data: perfume }
        : { success: false, message: 'Perfume not found' };
}

updatePerfume(id: number, updatePerfumeDto: UpdatePerfumeDto) {
    const index = this.perfumes.
}