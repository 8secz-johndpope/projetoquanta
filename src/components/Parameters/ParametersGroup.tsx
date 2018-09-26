import * as React from 'react';

import { UnderlinedHeader } from '../../common-elements';
import { PropertiesTable } from '../../common-elements/fields-layout';

import { FieldModel } from '../../services/models';
import { Field } from '../Fields/Field';

import { mapWithLast } from '../../utils';

export interface ParametersGroupProps {
  place: string;
  parameters: FieldModel[];
}

export class ParametersGroup extends React.PureComponent<ParametersGroupProps, any> {

  //TODO REFAZER ISTO DE UMA MANEIRA CORRETA
  getChar(param: string){
    return param.indexOf('header') == -1 ? 'a' : 'o'
  }

  render() {
    const { place, parameters } = this.props;
    if (!parameters || !parameters.length) {
      return null;
    }

    return (
      <div key={place}>
        <UnderlinedHeader>Parâmetros d{this.getChar(place)} {place} </UnderlinedHeader>
        <PropertiesTable>
          <tbody>
            {mapWithLast(parameters, (field, isLast) => (
              <Field key={field.name} isLast={isLast} field={field} showExamples={true} />
            ))}
          </tbody>
        </PropertiesTable>
      </div>
    );
  }
}
