import React from 'react';
import { ServiceNode } from './Service';
import { NodeTypes } from 'reactflow';
import { GroupNode } from '../groups/Group';

import ec2Data from '../../assets/awsIcons/Architecture-Service-Icons/Arch_Compute/Arch_Amazon-EC2_64.svg';
import elbData from '../../assets/awsIcons/Architecture-Service-Icons/Arch_Networking-Content-Delivery/Arch_Elastic-Load-Balancing_64.svg';
import vpcData from '../../assets/awsIcons/Architecture-Group-Icons/Virtual-private-cloud-VPC_32.svg';
import privateSubnetData from '../../assets/awsIcons/Architecture-Group-Icons/Private-subnet_32.svg';
import publicSubnetData from '../../assets/awsIcons/Architecture-Group-Icons/Public-subnet_32.svg';


export namespace AWS {
    const EC2 = () => <ServiceNode data={ec2Data} alt="ec2" />
    const ElasticLoadBalancing = () => <ServiceNode data={elbData} alt="elb" />
    const VPC = () => <GroupNode data={vpcData} alt="vpc" title="VPC" />
    const PrivateSubnet = () => <GroupNode data={publicSubnetData} alt="private subnet" title="private subnet" />
    const PublicSubnet = () => <GroupNode data={privateSubnetData} alt="private subnet" title="private subnet" />

    export const services: NodeTypes = {
        ec2: EC2,
        elb: ElasticLoadBalancing,
        vpc: VPC,
        privateSubnet: PrivateSubnet,
        publicSubnet: PublicSubnet,
    }
}
