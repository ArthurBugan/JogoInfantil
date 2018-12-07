import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field } from 'react-final-form';
import { Input as InputBase, Item, Text, Label } from 'native-base';
import * as validation from './validation';

const renderInput = ({ input, label, placeholder, type, meta, style, styleErro, rounded }) => {
  const password = type === 'password' || type === 'confirmPassword';

  let styleItem = style;
  if (meta.error && meta.touched) {
    styleItem = { ...style, borderColor: '#F00' };
  }
  if (rounded) {
    return (
      <View>
        <Item rounded style={styleItem}>
          <InputBase {...input} secureTextEntry={password} placeholder={placeholder} />
        </Item>
        {meta.error && meta.touched && <Text style={styleErro}>{meta.error}</Text>}
      </View>
    );
  }
  return (
    <View>
      <Item floatingLabel style={styleItem}>
        <Label style={{ marginTop: 10 }}>{label}</Label>
        <InputBase {...input} secureTextEntry={password} />
      </Item>
      {meta.error && meta.touched && <Text style={styleErro}>{meta.error}</Text>}
    </View>
  );
};


const Input = (props) => {
  const { type, validate, required, confirm } = props;
  let validationInternal;
  if (type === 'confirmPassword') {
    validationInternal = validation.confirmPassword2(confirm);
  } else if (typeof validation[type] === 'function' || validate) {
    if (typeof validation[type] === 'function') {
      validationInternal = validation[type];
    } else if (validate) {
      validationInternal = validate;
    }
  }

  if (validationInternal && required) {
    validationInternal = validation.composeValidators(validationInternal, validation.required);
  } else if (!validationInternal && required) {
    validationInternal = validation.required;
  }
  return (
    <Field
      {...props}
      component={renderInput}
      validate={validationInternal}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  confirm: PropTypes.string,
  validate: PropTypes.func,
  required: PropTypes.bool,
};
Input.defaultProps = {
  validate: null,
  confirm: null,
  required: false,
};

renderInput.propTypes = {
  input: PropTypes.object.isRequired,
  style: PropTypes.object,
  styleErro: PropTypes.object,
  meta: PropTypes.object,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  rounded: PropTypes.bool,
  placeholder: PropTypes.string,
};
renderInput.defaultProps = {
  style: {},
  styleErro: { color: '#F00', fontSize: 13, textAlign: 'center', marginTop: -17 },
  meta: {},
  rounded: false,
  label: null,
  placeholder: null,
};
export default Input;
