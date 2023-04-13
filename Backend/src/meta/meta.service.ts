import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meta } from './entities/meta.entity';

@Injectable()
export class MetaService {
  constructor(@InjectRepository(Meta) private metaRepository: Repository<Meta>) { }

  async getSingleUser(metamaskId: any) {
    const dataExists = await this.findOne(metamaskId);
    if (dataExists) {
      return dataExists
    }
  }

  findOne(metamaskId: any) {
    if (!metamaskId) {
      return null;
    }
    return this.metaRepository.findOne({ where: { metamaskId: metamaskId } });
  }

  async edit_details(fullName: string, emailAddress: string, metamaskId: string) {
    const dataExists = await this.findOne(metamaskId);
    if (!dataExists) {
      const addingData = this.metaRepository.create({ fullName, emailAddress, metamaskId });
      this.metaRepository.save(addingData);
      return addingData
    }
    dataExists.fullName = fullName
    dataExists.emailAddress = emailAddress
    dataExists.metamaskId = metamaskId
    this.metaRepository.save(dataExists);
    return dataExists
  }
}