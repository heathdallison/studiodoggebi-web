import { InjectionToken } from '@angular/core';
import { DomainConfig } from '../Models/interfaces';

export const DOMAIN_CONFIG = new InjectionToken<DomainConfig>('DOMAIN_CONFIG');
