import { sepolia, arbitrum } from 'wagmi/chains'
import {web3modalWagmiConfigWithSafe} from "@/web3modal-safe-apps/web3modalWagmiConfigWithSafe";

// Your WalletConnect Cloud project ID
export const projectId = '357b8852563f2b2429a8e515a8b0135d'

// Create a metadata object
const metadata = {
  name: 'next-sandbox',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia] as const
export const wagmiConfig = web3modalWagmiConfigWithSafe({
  chains,
  projectId,
  metadata,
  enableEIP6963: true,
  enableCoinbase: false,
  auth: {
    email: false
  },
  enableInjected: true,
  enableWalletConnect: true
})

export const web3modalConfig = {
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  allWallets: 'ONLY_MOBILE' as 'ONLY_MOBILE',
  featuredWalletIds: [
    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f'
  ],
  allowUnsupportedChain: false,
  includeWalletIds: [
    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f'
  ]
}
