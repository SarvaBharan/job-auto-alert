import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobAlert } from '../schemas/job-alert.schema';
import { CreateJobAlertDto } from './dto/create-job-alert.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobAlertsService {
  constructor(
    @InjectModel(JobAlert.name) private jobAlertModel: Model<JobAlert>,
  ) {}

  async create(createJobAlertDto: CreateJobAlertDto, userId: string) {
    const jobAlert = new this.jobAlertModel({
      ...createJobAlertDto,
      userId,
      isActive: true,
      status: 'pending',
    });
    return jobAlert.save();
  }

  async findAll(userId: string) {
    return this.jobAlertModel.find({ userId }).exec();
  }
  async findOne(id: string, userId: string) {
    const alert = await this.jobAlertModel.findOne({ _id: id, userId }).exec();
    if (!alert) {
      throw new NotFoundException('Job alert not found');
    }
    return alert;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkJobAlerts() {
    const alerts = await this.jobAlertModel.find({ isActive: true }).exec();
    for (const alert of alerts) {
      try {
        // Implement job checking logic here
        await this.jobAlertModel.updateOne(
          { _id: alert._id },
          { 
            $set: { 
              lastChecked: new Date(),
              status: 'checked'
            } 
          }
        );
      } catch (error) {
        console.error(`Error checking job alert ${alert._id}:`, error);
      }
    }
  }
}
