'use client';

import {useEffect, useState} from "react";

import { useWalletClient } from 'wagmi';
import {prepareSafeAccount, prepareSmartAccountClient} from "@/services/prepareSmartAccountClient";
import {isWingmanModuleInitialized} from "@/services/installModule";
import {walletClientToSmartAccountSigner} from "permissionless";

export default function useSmartAccountClient() {
	const [client, setClient] = useState({
		smartAccountClient: null,
		isModuleSupported: false,
		isWingmanDeployed: false
	});

	const { data: walletClient } = useWalletClient();

	useEffect(() => {
		if (!walletClient) return;

		console.log('walletClient', walletClient);

		(async () => {
			const smartAccountSigner = await walletClientToSmartAccountSigner(walletClient);

			console.log('smartAccountSigner', smartAccountSigner);

			const safeSmartAccount = await prepareSafeAccount(smartAccountSigner);

			console.log('safeSmartAccount', safeSmartAccount)

			const smartAccountClient = await prepareSmartAccountClient(safeSmartAccount);

			console.log('smartAccountClient', smartAccountClient);

			const isModuleSupported = await smartAccountClient.supportsModule({
				type: "fallback"
			});

			console.log('isModuleSupported', isModuleSupported)

			const isWingmanDeployed = await isWingmanModuleInitialized(smartAccountClient);

			console.log('isWingmanDeployed', isWingmanDeployed);

			setClient({
				smartAccountClient,
				isModuleSupported,
				isWingmanDeployed
			});
		})()

	}, [walletClient]);

	return client;
}
