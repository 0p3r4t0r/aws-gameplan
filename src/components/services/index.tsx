import React from 'react';
import ec2Data from '../../assets/awsIcons/Architecture-Service-Icons/Arch_Compute/Arch_Amazon-EC2_64.svg';
import elbData from '../../assets/awsIcons/Architecture-Service-Icons/Arch_Networking-Content-Delivery/Arch_Elastic-Load-Balancing_64.svg';
import { ServiceNode } from './Service';
import { NodeTypes } from 'reactflow';


export namespace AWS {
    const EC2 = () => <ServiceNode data={ec2Data} alt="ec2" />
    const ElasticLoadBalancing = () => <ServiceNode data={elbData} alt="elb" />

    export const services: NodeTypes = {
        ec2: EC2,
        elb: ElasticLoadBalancing,
    }
}
