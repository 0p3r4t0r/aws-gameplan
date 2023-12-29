import { NodeTypes } from 'reactflow';

import { Groups } from '../../__generated__/groups';
import { Compute } from '../../__generated__/services/compute';
import { NetworkingContentDelivery } from '../../__generated__/services/networkingContentDelivery';


export const services: NodeTypes = {
    ...Compute,
    ...NetworkingContentDelivery,
    ...Groups
}