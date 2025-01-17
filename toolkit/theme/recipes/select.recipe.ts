import { defineSlotRecipe } from '@chakra-ui/react';

// TODO @tom2drum check sizes for select
export const recipe = defineSlotRecipe({
  slots: [ 'root', 'trigger', 'indicatorGroup', 'indicator', 'content', 'item', 'control', 'itemText', 'itemGroup', 'itemGroupLabel', 'label', 'valueText' ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      minH: 'var(--select-trigger-height)',
      px: 'var(--select-trigger-padding-x)',
      borderRadius: 'base',
      userSelect: 'none',
      textAlign: 'start',
      fontWeight: '500',
      focusVisibleRing: 'none',
      _placeholderShown: {
        color: 'gray.500',
      },
      _disabled: {
        layerStyle: 'disabled',
      },
      _invalid: {
        borderColor: 'select.border.error',
      },
    },
    indicatorGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      pos: 'absolute',
      right: '0',
      top: '0',
      bottom: '0',
      px: 'var(--select-trigger-padding-x)',
      pointerEvents: 'none',
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'inherit',
    },
    content: {
      background: 'popover.bg',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'dropdown',
      borderRadius: 'base',
      outline: 0,
      maxH: '96',
      overflowY: 'auto',
      boxShadow: 'md',
      _open: {
        animationStyle: 'slide-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'slide-fade-out',
        animationDuration: 'fastest',
      },
    },
    item: {
      position: 'relative',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      cursor: 'option',
      justifyContent: 'space-between',
      flex: '1',
      textAlign: 'start',
      borderRadius: 'base',
      _highlighted: {
        bg: 'bg.emphasized/60',
      },
      _disabled: {
        pointerEvents: 'none',
        opacity: '0.5',
      },
      _icon: {
        width: '4',
        height: '4',
      },
    },
    control: {
      pos: 'relative',
    },
    itemText: {
      flex: '1',
    },
    itemGroup: {
      _first: { mt: '0' },
    },
    itemGroupLabel: {
      py: '1',
      fontWeight: 'medium',
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      textStyle: 'sm',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    valueText: {
      lineClamp: '1',
      maxW: '80%',
    },
  },

  variants: {
    variant: {
      outline: {
        trigger: {
          bg: 'transparent',
          borderWidth: '2px',
          borderColor: 'select.border',
          _expanded: {
            borderColor: 'select.border.hover',
          },
          _hover: {
            borderColor: 'select.border.hover',
          },
          _focusVisible: {
            borderColor: 'select.border.hover',
            focusVisibleRing: 'none',
          },
        },
      },
    },

    size: {
      xs: {
        root: {
          '--select-trigger-height': 'sizes.8',
          '--select-trigger-padding-x': 'spacing.2',
        },
        content: {
          p: '1',
          gap: '1',
          textStyle: 'xs',
        },
        trigger: {
          textStyle: 'xs',
          gap: '1',
        },
        item: {
          py: '1',
          px: '2',
        },
        itemGroupLabel: {
          py: '1',
          px: '2',
        },
        indicator: {
          _icon: {
            width: '3.5',
            height: '3.5',
          },
        },
      },

      sm: {
        root: {
          '--select-trigger-height': 'sizes.9',
          '--select-trigger-padding-x': 'spacing.2.5',
        },
        content: {
          p: '1',
          textStyle: 'sm',
        },
        trigger: {
          textStyle: 'sm',
          gap: '1',
        },
        indicator: {
          _icon: {
            width: '4',
            height: '4',
          },
        },
        item: {
          py: '1',
          px: '1.5',
        },
        itemGroup: {
          mt: '1',
        },
        itemGroupLabel: {
          py: '1',
          px: '1.5',
        },
      },

      md: {
        root: {
          '--select-trigger-height': 'sizes.10',
          '--select-trigger-padding-x': 'spacing.3',
        },
        content: {
          p: '1',
          textStyle: 'sm',
        },
        itemGroup: {
          mt: '1.5',
        },
        item: {
          py: '1.5',
          px: '2',
        },
        itemIndicator: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        itemGroupLabel: {
          py: '1.5',
          px: '2',
        },
        trigger: {
          textStyle: 'sm',
          gap: '2',
        },
        indicator: {
          _icon: {
            width: '4',
            height: '4',
          },
        },
      },

      lg: {
        root: {
          '--select-trigger-height': 'sizes.12',
          '--select-trigger-padding-x': 'spacing.4',
        },
        content: {
          p: '1.5',
          textStyle: 'md',
        },
        itemGroup: {
          mt: '2',
        },
        item: {
          py: '2',
          px: '3',
        },
        itemGroupLabel: {
          py: '2',
          px: '3',
        },
        trigger: {
          textStyle: 'md',
          py: '3',
          gap: '2',
        },
        indicator: {
          _icon: {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
});
