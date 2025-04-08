import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import NavigationBar from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowUpRight, Shield, Coins, Vote, Zap, Users, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SolflarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Back to Demo Button */}
        <div className="flex justify-start mb-4">
          <Link href="/demo">
            <Button variant="outline" className="border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-900/20">
              Back to Demo
            </Button>
          </Link>
        </div>

        {/* Integration Header Card */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/20 to-orange-900/20 opacity-50"></div>
          <CardHeader className="border-b border-gray-800 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                {/* MindMash Logo and Text */}
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafybeia5skhvck24266qahayvxuhc5k3ez27xnmscrlwfjnwloeal5rdam"
                    alt="MindMash.AI Logo"
                    width={40}
                    height={40}
                    className="drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  />
                  <span className="font-cyber text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
                    MindMash.AI
                  </span>
                </div>

                <span className="text-gray-400">+</span>

                {/* Solflare Logo */}
                <div className="flex items-center space-x-2">
                  <Image
                    src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafkreidcu55wibsgxbw4yh2j5bpjv4d2ia6sswt2amuvd7fabugh2tvkcq"
                    alt="Solflare Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-fuchsia-400">Solflare Wallet</CardTitle>
                    <CardDescription className="text-gray-400">Powering MindMash.AI's Web3 Experience</CardDescription>
                  </div>
                </div>
              </div>

              <a href="https://www.solflare.com/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </a>
            </div>
          </CardHeader>

          <CardContent className="pt-6 relative z-10">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-fuchsia-400 mb-2 font-cyber tracking-wider">
                The Ultimate Web3 Experience for MindMash.AI
              </h3>
              <p className="text-gray-300">
                Solflare is the preferred wallet for MindMash.AI users, providing secure access to MashBIT tokens, NFT
                minting, and participation in AI Syndicates. Connect your wallet to unlock the full potential of
                decentralized AI collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-orange-400" />
                    <CardTitle className="text-lg text-white">Self-Custody</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Full control of your MashBIT tokens and NFTs with secure key management and hardware wallet support.
                  </p>
                  <a href="https://www.solflare.com/" target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="text-orange-400 p-0 h-auto mt-2">
                      Learn more <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-orange-400" />
                    <CardTitle className="text-lg text-white">MashBIT Staking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Earn passive rewards by staking your MashBIT tokens and participate in AI model governance.
                  </p>
                  <a href="https://www.solflare.com/staking" target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="text-orange-400 p-0 h-auto mt-2">
                      Start staking <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Vote className="h-5 w-5 text-orange-400" />
                    <CardTitle className="text-lg text-white">DAO Governance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Shape the future of MindMash.AI by voting on proposals and participating in decentralized
                    governance.
                  </p>
                  <a href="https://www.solflare.com/" target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="text-orange-400 p-0 h-auto mt-2">
                      View proposals <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* MindMash.AI Integration Benefits */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-fuchsia-400 font-cyber tracking-wider">
              MindMash.AI Integration Benefits
            </CardTitle>
            <CardDescription className="text-gray-400">
              Exclusive features for MindMash.AI users with Solflare
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-800/30 transition-colors">
                <Zap className="h-10 w-10 text-fuchsia-500 mb-3" />
                <h3 className="text-lg font-medium text-white mb-2 font-cyber">AI Syndicate Access</h3>
                <p className="text-sm text-gray-400">
                  Join exclusive AI Syndicates to collaborate on AI models and share in the rewards.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-800/30 transition-colors">
                <Users className="h-10 w-10 text-fuchsia-500 mb-3" />
                <h3 className="text-lg font-medium text-white mb-2 font-cyber">NFT Collaborator Status</h3>
                <p className="text-sm text-gray-400">
                  Mint and manage your AI Collaborator NFTs that unlock premium platform features.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-800/30 transition-colors">
                <BarChart3 className="h-10 w-10 text-fuchsia-500 mb-3" />
                <h3 className="text-lg font-medium text-white mb-2 font-cyber">Token Rewards</h3>
                <p className="text-sm text-gray-400">
                  Earn and track MashBIT tokens for your contributions to AI model improvements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Assets Card */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-fuchsia-400 font-cyber tracking-wider">Your MindMash.AI Assets</CardTitle>
            <CardDescription className="text-gray-400">
              Connect your wallet to view your MashBIT tokens and NFTs
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8">
              <Wallet className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-white font-cyber">No wallet connected</h3>
              <p className="text-sm text-gray-400 mt-1 mb-4">
                Connect your Solflare wallet to view your MashBIT tokens, NFTs, and Syndicate memberships
              </p>
              <a href="https://www.solflare.com/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20">
                  Connect Wallet
                </Button>
              </a>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 text-xs text-gray-500 pt-4">
            <p>
              MindMash.AI uses Solflare for secure, non-custodial wallet services. We never store your private keys. All
              transactions are processed on the Solana blockchain.
            </p>
          </CardFooter>
        </Card>

        <NavigationBar />
      </div>
    </div>
  )
}
