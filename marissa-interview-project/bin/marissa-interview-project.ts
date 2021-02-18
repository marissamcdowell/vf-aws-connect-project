#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MarissaInterviewProjectStack } from '../lib/marissa-interview-project-stack';

const app = new cdk.App();
new MarissaInterviewProjectStack(app, 'MarissaInterviewProjectStack');
