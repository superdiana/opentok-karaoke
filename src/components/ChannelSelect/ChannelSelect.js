import React from 'react';
import { Select } from '@chakra-ui/core';

function ChannelSelect() {

  return (
    <Select placeholder="Select Channel" color="black" flex={1}>
      <option value="option1">Channel 1</option>
      <option value="option2">Channel 2</option>
      <option value="option3">Channel 3</option>
    </Select>
  )
};

export default ChannelSelect;
;