import React from 'react'
import { GroupNode } from '../components/services/Group'

import AWSAccountData from '../assets/awsIcons/Architecture-Group-Icons/AWS-Account_32.svg'
import AWSCloudLogoData from '../assets/awsIcons/Architecture-Group-Icons/AWS-Cloud-logo_32.svg'
import AWSCloudData from '../assets/awsIcons/Architecture-Group-Icons/AWS-Cloud_32.svg'
import AWSIoTGreengrassDeploymentData from '../assets/awsIcons/Architecture-Group-Icons/AWS-IoT-Greengrass-Deployment_32.svg'
import AutoScalingGroupData from '../assets/awsIcons/Architecture-Group-Icons/Auto-Scaling-group_32.svg'
import CorporateDataCenterData from '../assets/awsIcons/Architecture-Group-Icons/Corporate-data-center_32.svg'
import EC2InstanceContentsData from '../assets/awsIcons/Architecture-Group-Icons/EC2-instance-contents_32.svg'
import PrivateSubnetData from '../assets/awsIcons/Architecture-Group-Icons/Private-subnet_32.svg'
import PublicSubnetData from '../assets/awsIcons/Architecture-Group-Icons/Public-subnet_32.svg'
import RegionData from '../assets/awsIcons/Architecture-Group-Icons/Region_32.svg'
import ServerContentsData from '../assets/awsIcons/Architecture-Group-Icons/Server-contents_32.svg'
import SpotFleetData from '../assets/awsIcons/Architecture-Group-Icons/Spot-Fleet_32.svg'
import VirtualPrivateCloudVPCData from '../assets/awsIcons/Architecture-Group-Icons/Virtual-private-cloud-VPC_32.svg'

export const AWSAccount = () => <GroupNode data={AWSAccountData} title="AWSAccount" />
export const AWSCloudLogo = () => <GroupNode data={AWSCloudLogoData} title="AWSCloudLogo" />
export const AWSCloud = () => <GroupNode data={AWSCloudData} title="AWSCloud" />
export const AWSIoTGreengrassDeployment = () => <GroupNode data={AWSIoTGreengrassDeploymentData} title="AWSIoTGreengrassDeployment" />
export const AutoScalingGroup = () => <GroupNode data={AutoScalingGroupData} title="AutoScalingGroup" />
export const CorporateDataCenter = () => <GroupNode data={CorporateDataCenterData} title="CorporateDataCenter" />
export const EC2InstanceContents = () => <GroupNode data={EC2InstanceContentsData} title="EC2InstanceContents" />
export const PrivateSubnet = () => <GroupNode data={PrivateSubnetData} title="PrivateSubnet" />
export const PublicSubnet = () => <GroupNode data={PublicSubnetData} title="PublicSubnet" />
export const Region = () => <GroupNode data={RegionData} title="Region" />
export const ServerContents = () => <GroupNode data={ServerContentsData} title="ServerContents" />
export const SpotFleet = () => <GroupNode data={SpotFleetData} title="SpotFleet" />
export const VirtualPrivateCloudVPC = () => <GroupNode data={VirtualPrivateCloudVPCData} title="VirtualPrivateCloudVPC" />
