import { type ButtonProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import type { Screen } from 'ui/snippets/auth/types';

import config from 'configs/app';
import * as mixpanel from 'lib/mixpanel';
import useAccount from 'lib/web3/useAccount';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'toolkit/chakra/popover';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import AuthModal from 'ui/snippets/auth/AuthModal';
import useProfileQuery from 'ui/snippets/auth/useProfileQuery';

import UserProfileButton from './UserProfileButton';
import UserProfileContent from './UserProfileContent';

interface Props {
  buttonSize?: ButtonProps['size'];
  buttonVisual?: ButtonProps['visual'];
}

const initialScreen = {
  type: config.features.blockchainInteraction.isEnabled ? 'select_method' as const : 'email' as const,
};

const UserProfileDesktop = ({ buttonSize, buttonVisual = 'header' }: Props) => {
  const [ authInitialScreen, setAuthInitialScreen ] = React.useState<Screen>(initialScreen);
  const router = useRouter();

  const authModal = useDisclosure();
  const profileMenu = useDisclosure();

  const profileQuery = useProfileQuery();
  const { address: web3Address } = useAccount();

  const handleProfileButtonClick = React.useCallback(() => {
    if (profileQuery.data || web3Address) {
      mixpanel.logEvent(mixpanel.EventTypes.ACCOUNT_ACCESS, { Action: 'Dropdown open' });
      profileMenu.onOpen();
      return;
    }

    if (router.pathname === '/apps/[id]' && config.features.blockchainInteraction.isEnabled) {
      setAuthInitialScreen({ type: 'connect_wallet' });
    }

    authModal.onOpen();
  }, [ profileQuery.data, router.pathname, authModal, profileMenu, web3Address ]);

  const handleAddEmailClick = React.useCallback(() => {
    setAuthInitialScreen({ type: 'email', isAuth: true });
    authModal.onOpen();
  }, [ authModal ]);

  const handleAddAddressClick = React.useCallback(() => {
    setAuthInitialScreen({ type: 'connect_wallet', isAuth: true });
    authModal.onOpen();
  }, [ authModal ]);

  const handleAuthModalClose = React.useCallback(() => {
    setAuthInitialScreen(initialScreen);
    authModal.onClose();
  }, [ authModal ]);

  const handleOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    if (open) {
      profileMenu.onOpen();
    } else {
      profileMenu.onClose();
    }
  }, [ profileMenu ]);

  return (
    <>
      <PopoverRoot positioning={{ placement: 'bottom-end' }} lazyMount open={ profileMenu.open } onOpenChange={ handleOpenChange }>
        <PopoverTrigger>
          <UserProfileButton
            profileQuery={ profileQuery }
            size={ buttonSize }
            visual={ buttonVisual }
            onClick={ handleProfileButtonClick }
          />
        </PopoverTrigger>
        { (profileQuery.data || web3Address) && (
          <PopoverContent w="280px">
            <PopoverBody>
              <UserProfileContent
                data={ profileQuery.data }
                onClose={ profileMenu.onClose }
                onLogin={ authModal.onOpen }
                onAddEmail={ handleAddEmailClick }
                onAddAddress={ handleAddAddressClick }
              />
            </PopoverBody>
          </PopoverContent>
        ) }
      </PopoverRoot>
      { authModal.open && (
        <AuthModal
          onClose={ handleAuthModalClose }
          initialScreen={ authInitialScreen }
        />
      ) }
    </>
  );
};

export default React.memo(UserProfileDesktop);
