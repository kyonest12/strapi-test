import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementInfo extends Schema.Component {
  collectionName: 'components_element_infos';
  info: {
    displayName: 'info';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    is_done: Attribute.Boolean;
  };
}

export interface ElementField extends Schema.Component {
  collectionName: 'components_element_fields';
  info: {
    displayName: 'field';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface ElementButton extends Schema.Component {
  collectionName: 'components_element_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'element.info': ElementInfo;
      'element.field': ElementField;
      'element.button': ElementButton;
    }
  }
}
