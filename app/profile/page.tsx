"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import NavigationBar from "@/components/navigation-bar"
import { useAudio } from "@/components/audio-manager"
import {
  Copy,
  Check,
  ExternalLink,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  ArrowLeft,
  Camera,
  Upload,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { playSound } = useAudio()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    displayName: "JD",
    bio: "AI enthusiast and blockchain developer",
    email: "john.doe@example.com",
    profilePic: "",
    banner: "",
  })

  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setProfilePreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerProfilePicUpload = () => {
    profileInputRef.current?.click()
  }

  const triggerBannerUpload = () => {
    bannerInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save to a database here
    // Also handle the profile pic and banner uploads
    if (profilePreview) {
      setFormData((prev) => ({ ...prev, profilePic: profilePreview }))
    }
    if (bannerPreview) {
      setFormData((prev) => ({ ...prev, banner: bannerPreview }))
    }

    playSound("/sounds/button-click.mp3")
    addNotification("success", "Profile updated successfully!", 3000)
    setIsEditing(false)

    // Reset previews after saving
    setProfilePreview(null)
    setBannerPreview(null)
  }

  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: string }>>([])

  const addNotification = (type: string, message: string, duration = 5000) => {
    const id = Date.now().toString()
    setNotifications((prev) => [...prev, { id, type, message }])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }, duration)
  }

  // Mock wallet data
  const walletAddress = "5Gh7Lk...9xYz3W"
  const fullWalletAddress = "5Gh7LkPjL8mNVEo1HvXRjasdUY9xYz3W"
  const transactions = [
    {
      id: "tx1",
      type: "Received",
      amount: "250 MBIT",
      from: "AI Collaboration Reward",
      date: "2 hours ago",
      status: "Completed",
    },
    { id: "tx2", type: "Sent", amount: "50 MBIT", to: "NFT Purchase", date: "Yesterday", status: "Completed" },
    {
      id: "tx3",
      type: "Received",
      amount: "0.05 SOL",
      from: "Syndicate Distribution",
      date: "3 days ago",
      status: "Completed",
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullWalletAddress)
    setCopied(true)
    playSound("/sounds/button-click.mp3")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4"
      style={{
        "--animate-fade-in-out": "opacity 0.5s ease-in-out",
      }}
    >
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-md shadow-lg text-white ${
                notification.type === "success"
                  ? "bg-green-600"
                  : notification.type === "error"
                    ? "bg-red-600"
                    : "bg-blue-600"
              } animate-fade-in-out`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Back to Demo Button */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/demo">
            <Button
              variant="outline"
              className="border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-900/20"
              onClick={() => playSound("/sounds/button-click.mp3")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Demo
            </Button>
          </Link>
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
            MindMash.AI Profile
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white overflow-hidden">
          <div className="relative">
            <div
              className="h-24 bg-gradient-to-r from-purple-600 to-fuchsia-600"
              style={{
                backgroundImage:
                  formData.banner || bannerPreview
                    ? `url(${bannerPreview || formData.banner})`
                    : "linear-gradient(to right, #9333ea, #d946ef)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {isEditing && (
                <button
                  onClick={triggerBannerUpload}
                  className="absolute right-2 top-2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  type="button"
                >
                  <Upload className="h-4 w-4 text-white" />
                  <span className="sr-only">Change banner</span>
                </button>
              )}
            </div>
            <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={handleBannerChange} />
          </div>
          <CardContent className="pt-0 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-12">
              <div className="flex-shrink-0 ring-4 ring-black bg-black rounded-full relative">
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-700 flex items-center justify-center text-white text-3xl font-bold border-2 border-fuchsia-300 overflow-hidden"
                  style={{
                    backgroundImage:
                      profilePreview || formData.profilePic ? `url(${profilePreview || formData.profilePic})` : "",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!profilePreview && !formData.profilePic && formData.displayName}
                  {isEditing && (
                    <button
                      onClick={triggerProfilePicUpload}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <Camera className="h-6 w-6 text-white" />
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={profileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </div>
              <div className="text-center md:text-left md:flex-1 space-y-1">
                <h2 className="text-2xl font-bold text-white">{formData.username}</h2>
                <p className="text-gray-400">Joined March 2025</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-900/20"
                  onClick={() => {
                    if (isEditing) {
                      // Reset previews when canceling
                      setProfilePreview(null)
                      setBannerPreview(null)
                    }
                    setIsEditing(!isEditing)
                    playSound("/sounds/button-click.mp3")
                  }}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                )}
                <Button
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
                  onClick={() => playSound("/sounds/button-click.mp3")}
                >
                  Claim Rewards
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different profile sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-black border border-gray-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:text-fuchsia-400"
              onClick={() => playSound("/sounds/button-click.mp3")}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:text-fuchsia-400"
              onClick={() => playSound("/sounds/button-click.mp3")}
            >
              Crossmint Wallet
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-fuchsia-400">User Profile</CardTitle>
                <CardDescription className="text-gray-400">Manage your MindMash.AI identity</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-700 flex items-center justify-center text-white text-4xl font-bold border-2 border-fuchsia-300">
                      {formData.displayName}
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="username" className="text-sm font-medium text-gray-300 block mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="displayName" className="text-sm font-medium text-gray-300 block mb-1">
                            Display Name
                          </label>
                          <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                            maxLength={2}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="bio" className="text-sm font-medium text-gray-300 block mb-1">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 h-20"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                          />
                        </div>
                      </form>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-lg font-medium text-gray-300">Username</h3>
                          <p className="text-xl font-bold text-white">{formData.username}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-300">Bio</h3>
                          <p className="text-white">{formData.bio}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-300">Email</h3>
                          <p className="text-white">{formData.email}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-300">Mash.BiT Balance</h3>
                          <p className="text-xl font-bold text-fuchsia-400">1,250 MBIT</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-300">AI Interactions</h3>
                          <p className="text-xl font-bold text-white">47 sessions</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-300">NFTs Minted</h3>
                          <p className="text-xl font-bold text-white">3 creations</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-fuchsia-400">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-800 rounded-md p-4 hover:bg-gray-900/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-white">AI Collaboration Session #{i}</h4>
                          <p className="text-sm text-gray-400">Created a new project concept</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {i} day{i !== 1 ? "s" : ""} ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-4">
            <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
              <CardHeader className="border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-fuchsia-400 flex items-center">
                      <img
                        src="https://www.crossmint.com/assets/crossmint/logo.svg"
                        alt="Crossmint Logo"
                        className="h-5 w-5 mr-2"
                      />
                      Crossmint Smart Wallet
                    </CardTitle>
                    <CardDescription className="text-gray-400">Your embedded Solana wallet</CardDescription>
                  </div>
                  <Shield className="h-6 w-6 text-fuchsia-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Wallet Address */}
                <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
                      <p className="text-white font-mono mt-1">{walletAddress}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-fuchsia-400 hover:bg-fuchsia-900/20"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Token Balances */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-fuchsia-400 text-base">Mash.BiT Token</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold">1,250</div>
                          <div className="text-gray-400 text-xs">≈ $125.00 USD</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-900/20 text-xs"
                            onClick={() => playSound("/sounds/button-click.mp3")}
                          >
                            Send
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-xs"
                            onClick={() => playSound("/sounds/button-click.mp3")}
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-amber-400 text-base">Solana (SOL)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold">0.25</div>
                          <div className="text-gray-400 text-xs">≈ $35.75 USD</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-500 text-amber-400 hover:bg-amber-900/20 text-xs"
                            onClick={() => playSound("/sounds/button-click.mp3")}
                          >
                            Send
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-xs"
                            onClick={() => playSound("/sounds/button-click.mp3")}
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Transaction History */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <History className="h-4 w-4 mr-2" />
                      Transaction History
                    </h3>
                    <Button
                      variant="link"
                      className="text-fuchsia-400 p-0 h-auto"
                      onClick={() => playSound("/sounds/button-click.mp3")}
                    >
                      View all <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="border border-gray-800 rounded-md p-3 hover:bg-gray-900/50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`mt-1 p-1.5 rounded-full ${
                                tx.type === "Received"
                                  ? "bg-green-900/30 text-green-400"
                                  : "bg-purple-900/30 text-purple-400"
                              }`}
                            >
                              {tx.type === "Received" ? (
                                <ArrowDownLeft className="h-3 w-3" />
                              ) : (
                                <ArrowUpRight className="h-3 w-3" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                {tx.type} {tx.amount}
                              </h4>
                              <p className="text-xs text-gray-400">
                                {tx.type === "Received" ? "From: " + tx.from : "To: " + tx.to}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{tx.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NFT Collection */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">NFT Collection</h3>
                    <Button
                      variant="link"
                      className="text-fuchsia-400 p-0 h-auto"
                      onClick={() => playSound("/sounds/button-click.mp3")}
                    >
                      View all <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-md bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 border border-fuchsia-800/50 flex items-center justify-center cursor-pointer hover:border-fuchsia-500 transition-colors"
                        onClick={() => playSound("/sounds/button-click.mp3")}
                      >
                        <div className="text-center">
                          <div className="text-xs text-gray-400">Mash.BoT</div>
                          <div className="text-sm font-medium text-white">
                            #{i}0{i}5
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wallet Actions */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <a
                    href="https://www.solflare.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("/sounds/button-click.mp3")}
                  >
                    <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 flex items-center justify-center w-full">
                      <img
                        src="https://jade-late-crow-559.mypinata.cloud/ipfs/bafkreidcu55wibsgxbw4yh2j5bpjv4d2ia6sswt2amuvd7fabugh2tvkcq"
                        alt="Solflare Logo"
                        className="h-4 w-4 mr-2"
                      />
                      Connect to Solflare
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-900/20"
                    onClick={() => playSound("/sounds/button-click.mp3")}
                  >
                    View on Explorer
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <NavigationBar />
      </div>
    </div>
  )
}
