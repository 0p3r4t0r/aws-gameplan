import { NodeTypes } from 'reactflow';

import { Groups } from '../__generated__/groups';
import { Analytics } from '../__generated__/services/analytics';
import { AppIntegration } from '../__generated__/services/appIntegration';
import { Blockchain } from '../__generated__/services/blockchain';
import { BusinessApplications } from '../__generated__/services/businessApplications';
import { CloudFinancialManagement } from '../__generated__/services/cloudFinancialManagement';
import { Compute } from '../__generated__/services/compute';
import { Containers } from '../__generated__/services/containers';
import { CustomerEnablement } from '../__generated__/services/customerEnablement';
import { Database } from '../__generated__/services/database';
import { DeveloperTools } from '../__generated__/services/developerTools';
import { EndUserComputing } from '../__generated__/services/endUserComputing';
import { FrontEndWebMobile } from '../__generated__/services/frontEndWebMobile';
import { Games } from '../__generated__/services/games';
import { GeneralIcons } from '../__generated__/services/generalIcons';
import { InternetOfThings } from '../__generated__/services/internetOfThings';
import { MachineLearning } from '../__generated__/services/machineLearning';
import { ManagementGovernance } from '../__generated__/services/managementGovernance';
import { MediaServices } from '../__generated__/services/mediaServices';
import { MigrationTransfer } from '../__generated__/services/migrationTransfer';
import { NetworkingContentDelivery } from '../__generated__/services/networkingContentDelivery';
import { QuantumTechnologies } from '../__generated__/services/quantumTechnologies';
import { Robotics } from '../__generated__/services/robotics';
import { Satellite } from '../__generated__/services/satellite';
import { SecurityIdentityCompliance } from '../__generated__/services/securityIdentityCompliance';
import { Storage } from '../__generated__/services/storage';


/**
 * Here's everything, but you can just keep what you need.
 * EsBuild should tree-shake the rest.
 */
export const nodeTypes: NodeTypes = {
    ...Groups,

    // Services
    ...Analytics,
    ...AppIntegration,
    ...Blockchain,
    ...BusinessApplications,
    ...CloudFinancialManagement,
    ...Compute,
    ...Containers,
    ...CustomerEnablement,
    ...Database,
    ...DeveloperTools,
    ...EndUserComputing,
    ...FrontEndWebMobile,
    ...Games,
    ...GeneralIcons,
    ...InternetOfThings,
    ...MachineLearning,
    ...ManagementGovernance,
    ...MediaServices,
    ...MigrationTransfer,
    ...NetworkingContentDelivery,
    ...QuantumTechnologies,
    ...Robotics,
    ...Satellite,
    ...SecurityIdentityCompliance,
    ...Storage,
}
