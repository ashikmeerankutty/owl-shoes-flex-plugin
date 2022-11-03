import React from "react";
import {useFormPillState, FormPillGroup, FormPill} from '@twilio-paste/core/form-pill-group';

export interface StringArrayProps {
    entries: Array<string>
}

const Pills : React.FunctionComponent<StringArrayProps> = (props : StringArrayProps) => {
    const pillState = useFormPillState();
  
    return (
        <form>
          <FormPillGroup {...pillState} aria-label="Display entries">
            {props.entries.map((entry: string) => (
                <FormPill {...pillState}>
                {entry}
                </FormPill>))
            }
          </FormPillGroup>
        </form>
      );
};

export default Pills;