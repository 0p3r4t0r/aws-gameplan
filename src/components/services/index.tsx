import React from 'react';
import { NodeTypes } from 'reactflow';

import { AWS as AWSGroups } from '../../__generated__/groups';
import {AWS as AWSCompute } from '../../__generated__/services/compute';
import {AWS as AWSNetworkingContentDelivery } from '../../__generated__/services/networkingContentDelivery';


export namespace AWS {
    export const services: NodeTypes = {
        AmazonEC2: AWSCompute.Services.Compute.nodeTypes.AmazonEC2,
        ElasticLoadBalancing: AWSNetworkingContentDelivery.Services.NetworkingContentDelivery.nodeTypes.ElasticLoadBalancing,
        ...AWSGroups.Groups.nodeTypes
    }
}
