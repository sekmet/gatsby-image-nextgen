import {
  createElement,
  FunctionComponent,
  ComponentType,
  PropsWithChildren,
} from 'react';
import { GatsbyImageProps } from './GatsbyImage.browser';
import { GatsbyImage as GatsbyImageOriginal } from './GatsbyImage.browser';

export type CompatProps = {
  backgroundColor?: string | boolean;
  critical: boolean;
  Tag?: any;
  fixed?: {
    base64?: string;
    tracedSVG?: string;
    width: number;
    height: number;
    src: string;
    srcSet: string;
    srcWebp?: string;
    srcSetWebp?: string;
  };
  fluid?: {
    base64?: string;
    tracedSVG?: string;
    aspectRatio: number;
    src: string;
    srcSet: string;
    srcWebp?: string;
    srcSetWebp?: string;
    maxWidth?: number;
    maxHeight?: number;
  };
};

export function _createCompatLayer(Component: ComponentType<GatsbyImageProps>) {
  const GatsbyImageCompat: FunctionComponent<CompatProps> = function GatsbyImageCompat({
    fixed,
    fluid,
    backgroundColor,
    critical,
    Tag,
    ...props
  }) {
    let rewiredProps: Partial<GatsbyImageProps> = {
      alt: '',
      as: Tag,
      ...props,
    };

    if (backgroundColor) {
      rewiredProps.style = rewiredProps.style || {};
      backgroundColor === true ? `light-gray` : backgroundColor;
    }

    if (critical) {
      rewiredProps.loading = 'eager';
    }

    if (fixed) {
      if (Array.isArray(fixed)) {
        fixed = fixed[0];
      }

      rewiredProps = {
        placeholder: null,
        layout: 'fixed',
        width: fixed.width,
        height: fixed.height,
        images: {
          fallback: {
            src: fixed.src,
            srcSet: fixed.srcSet,
          },
          sources: [],
        },
      };

      if (fixed.base64 || fixed.tracedSVG) {
        rewiredProps.placeholder = {
          fallback: fixed.base64 || fixed.tracedSVG,
        };
      }

      if (fixed.srcWebp) {
        rewiredProps.images.sources.push({
          srcSet: fixed.srcSetWebp,
          type: 'image/webp',
        });
      }
    }

    if (fluid) {
      if (Array.isArray(fluid)) {
        fluid = fluid[0];
      }

      rewiredProps = {
        placeholder: null,
        width: 1,
        height: fluid.aspectRatio,
        layout: 'responsive',
        images: {
          fallback: {
            src: fluid.src,
            srcSet: fluid.srcSet,
          },
          sources: [],
        },
      };

      if (fluid.base64 || fluid.tracedSVG) {
        rewiredProps.placeholder = {
          fallback: fluid.base64 || fluid.tracedSVG,
        };
      }

      if (fluid.srcWebp) {
        rewiredProps.images.sources.push({
          srcSet: fluid.srcSetWebp,
          type: 'image/webp',
        });
      }
    }

    return (
      <Component alt="" {...props} {...(rewiredProps as GatsbyImageProps)} />
    );
  };

  return GatsbyImageCompat;
}

export const GatsbyImage: FunctionComponent<CompatProps> = _createCompatLayer(
  GatsbyImageOriginal
);
