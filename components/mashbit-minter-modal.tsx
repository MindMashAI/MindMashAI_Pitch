"use client"

import { useState, useEffect } from "react"
import { X, Download, Award, Zap, Users, RefreshCw, Wallet, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-manager"

interface MashbitMinterModalProps {
  isOpen: boolean
  onClose: () => void
  currentTokens: number
}

export default function MashbitMinterModal({ isOpen, onClose, currentTokens }: MashbitMinterModalProps) {
  const { playSound } = useAudio()
  const [step, setStep] = useState(1)
  const [mintAmount, setMintAmount] = useState(10)
  const [isMinting, setIsMinting] = useState(false)
  const [mintComplete, setMintComplete] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setMintAmount(10)
      setIsMinting(false)
      setMintComplete(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConnectWallet = () => {
    playSound("/sounds/button-click.mp3")
    setWalletConnected(true)
    setStep(2)
  }

  const handleMint = () => {
    playSound("/sounds/feature-select.mp3")
    setIsMinting(true)

    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false)
      setMintComplete(true)
      setStep(3)
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black/90 border border-cyan-900/50 rounded-lg shadow-lg shadow-cyan-500/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 px-4 py-3 border-b border-cyan-900/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Mash.BiT Token Minter
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-black/50">
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Connect Wallet */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mb-4">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="text-gray-400 mb-4">
                  Connect your Crossmint wallet to mint and manage your Mash.BiT tokens.
                </p>
              </div>

              <div className="bg-black/60 border border-gray-800 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Current Balance:</span>
                  <span className="text-cyan-400 font-bold">{currentTokens} Mash.BiT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Wallet Status:</span>
                  <span className="text-yellow-400">Not Connected</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-2"
                onClick={handleConnectWallet}
              >
                Connect Crossmint Wallet
              </Button>
            </div>
          )}

          {/* Step 2: Mint Tokens */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mb-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Mint Mash.BiT Tokens</h3>
                <p className="text-gray-400 mb-4">Choose how many tokens you'd like to mint to your wallet.</p>
              </div>

              <div className="bg-black/60 border border-gray-800 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Wallet Status:</span>
                  <span className="text-green-400 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" /> Connected
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Current Balance:</span>
                  <span className="text-cyan-400 font-bold">{currentTokens} Mash.BiT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Mint Amount:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full border-gray-700"
                      onClick={() => setMintAmount(Math.max(5, mintAmount - 5))}
                    >
                      -
                    </Button>
                    <span className="text-fuchsia-400 font-bold w-8 text-center">{mintAmount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full border-gray-700"
                      onClick={() => setMintAmount(Math.min(100, mintAmount + 5))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-2"
                onClick={handleMint}
                disabled={isMinting}
              >
                {isMinting ? (
                  <span className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Minting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Mint {mintAmount} Tokens
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tokens Minted Successfully!</h3>
                <p className="text-gray-400 mb-4">Your Mash.BiT tokens have been added to your wallet.</p>
              </div>

              <div className="bg-black/60 border border-gray-800 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Previous Balance:</span>
                  <span className="text-gray-400 font-bold">{currentTokens} Mash.BiT</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Minted Amount:</span>
                  <span className="text-fuchsia-400 font-bold">+{mintAmount} Mash.BiT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">New Balance:</span>
                  <span className="text-cyan-400 font-bold">{currentTokens + mintAmount} Mash.BiT</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-2"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-cyan-900/50 text-cyan-400 hover:bg-cyan-900/20"
                  onClick={() => setStep(2)}
                >
                  Mint More Tokens
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Token benefits section */}
        <div className="px-6 pb-6">
          <div className="mt-4 pt-4 border-t border-gray-800">
            <h4 className="text-sm font-bold text-cyan-400 mb-3">Token Benefits</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/40 p-2 rounded-md border border-gray-800 flex items-start">
                <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <Award className="h-3 w-3 text-fuchsia-400" />
                </div>
                <div className="text-xs">
                  <div className="font-medium text-white">Premium AI Access</div>
                </div>
              </div>

              <div className="bg-black/40 p-2 rounded-md border border-gray-800 flex items-start">
                <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <Users className="h-3 w-3 text-fuchsia-400" />
                </div>
                <div className="text-xs">
                  <div className="font-medium text-white">Exclusive Syndicates</div>
                </div>
              </div>

              <div className="bg-black/40 p-2 rounded-md border border-gray-800 flex items-start">
                <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <Zap className="h-3 w-3 text-fuchsia-400" />
                </div>
                <div className="text-xs">
                  <div className="font-medium text-white">Response Boost</div>
                </div>
              </div>

              <div className="bg-black/40 p-2 rounded-md border border-gray-800 flex items-start">
                <div className="bg-purple-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <RefreshCw className="h-3 w-3 text-fuchsia-400" />
                </div>
                <div className="text-xs">
                  <div className="font-medium text-white">Knowledge Mapping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
