import React, { useCallback } from "react";
import { useGamePlanStore } from "../../store";


export const ConsoleLogDiagram = () => {
    const rfInstance = useGamePlanStore(state => state.rfInstance);

    const onClick = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            console.log(flow);
        } else {
            console.warn('rfInstance is null, did you call onInit?');
        }
    }, [rfInstance]);

    return (
        <button
            style={{ zIndex: 100 }}
            onClick={() => onClick()}
            title="Log your diagram to the console."
        >
            Output Diagram
        </button>
    )

}