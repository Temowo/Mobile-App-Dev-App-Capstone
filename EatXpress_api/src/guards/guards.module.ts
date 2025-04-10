import { Module } from '@nestjs/common';
import { RolesGuard } from './guards.role_guard';

@Module({
    providers: [RolesGuard],
    exports: [RolesGuard],
})
export class GuardsModule {}
