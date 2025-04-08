import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, Zap, Brain, Sparkles, Lock, Vote, Trophy, HelpCircle } from "lucide-react"

export default function SyndicatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  SYNDICATES
                </CardTitle>
                <CardDescription className="text-gray-400 mt-2 max-w-2xl">
                  Join a decentralized collaboration network and unlock exclusive benefits, DAO privileges, and shared
                  vaults. Syndicates are a separate subscription service that is community-focused, DAO-governed, and
                  officially represented by MindMash.AI.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Zap className="h-10 w-10 text-fuchsia-500 mb-3" />
              <h3 className="text-lg font-medium text-white mb-2">Decentralized Networks</h3>
              <p className="text-gray-400 text-sm">
                Each Syndicate represents a unique philosophy of intelligence, collaboration style, and strategy within
                the AI-powered realm.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Lock className="h-10 w-10 text-cyan-500 mb-3" />
              <h3 className="text-lg font-medium text-white mb-2">Shared Vaults</h3>
              <p className="text-gray-400 text-sm">
                Monthly dues ($3) are locked into Syndicate Vaults, governed by members and redeemable every 6 months
                via DAO vote.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Trophy className="h-10 w-10 text-amber-500 mb-3" />
              <h3 className="text-lg font-medium text-white mb-2">Exclusive Benefits</h3>
              <p className="text-gray-400 text-sm">
                Unlock quests, specialized AI modes, NFT badges, and access to Syndicate-specific zones in the
                Collab:Sphere.
              </p>
            </div>
            <div className="col-span-3 mt-6 border-t border-gray-800 pt-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-300">
                <div className="flex-1 p-4 border border-gray-800 rounded-lg bg-black/30">
                  <span className="text-cyan-400 font-medium block mb-2">Separate Subscription</span>
                  <p className="text-sm">
                    Syndicates are separate from your MindMash.AI subscription - they represent an additional community
                    layer where like-minded collaborators pool resources and govern their own initiatives.
                  </p>
                </div>
                <div className="flex-1 p-4 border border-gray-800 rounded-lg bg-black/30">
                  <span className="text-fuchsia-400 font-medium block mb-2">Community-Focused DAO</span>
                  <p className="text-sm">
                    Each Syndicate operates with its own treasury and governance structure, while being officially
                    recognized and represented by MindMash.AI in the broader ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Syndicates Tabs */}
        <Tabs defaultValue="entropic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-black border border-gray-800">
            <TabsTrigger
              value="entropic"
              className="data-[state=active]:text-fuchsia-400 data-[state=active]:bg-gray-900/50"
            >
              Entropic Signal
            </TabsTrigger>
            <TabsTrigger
              value="quantum"
              className="data-[state=active]:text-cyan-400 data-[state=active]:bg-gray-900/50"
            >
              Quantum Flow
            </TabsTrigger>
            <TabsTrigger
              value="logic"
              className="data-[state=active]:text-amber-400 data-[state=active]:bg-gray-900/50"
            >
              Logic Dominion
            </TabsTrigger>
          </TabsList>

          {/* Entropic Signal Content */}
          <TabsContent value="entropic">
            <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-fuchsia-900/50 to-purple-900/50 relative">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "overlay",
                  }}
                ></div>
                <div className="absolute bottom-4 left-6 flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold border-2 border-black">
                    ES
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Entropic Signal</h2>
                    <p className="text-fuchsia-300">Chaos Innovators</p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="border-l-4 border-fuchsia-500 pl-4 italic text-gray-300 mb-6">
                  "We ride the glitch, shape the unknown, and weaponize chaos into brilliance."
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-fuchsia-400 font-medium mb-3 flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      Philosophy
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Unpredictable, decentralized creative bursts. Entropic Signal members value edge-tech,
                      boundary-pushing ideas, and spontaneous breakthroughs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-fuchsia-400 font-medium mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Ideal For
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Artists, rogue devs, social hackers, glitchpunk theorists, and those who see systems as tools to
                      be remixed.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-fuchsia-400 font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Exclusive Benefits
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">•</span>
                      <span>Access to Glitch Challenges that change weekly and reward unexpected thinking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">•</span>
                      <span>Syndicate Vault unlocks for creative projects or entropic experiments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">•</span>
                      <span>AI agents in Experimental Mode, offering wild strategies and divergent insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">•</span>
                      <span>DAO governance with a 'disruption weighted' voting multiplier</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">•</span>
                      <span>Exclusive pixel-art badge: The Signal Core</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white">
                  Join Entropic Signal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quantum Flow Content */}
          <TabsContent value="quantum">
            <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 relative">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "overlay",
                  }}
                ></div>
                <div className="absolute bottom-4 left-6 flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold border-2 border-black">
                    QF
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Quantum Flow</h2>
                    <p className="text-cyan-300">Balanced Collaborators</p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="border-l-4 border-cyan-500 pl-4 italic text-gray-300 mb-6">
                  "Harmony is not silence, it is synchronized momentum."
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-cyan-400 font-medium mb-3 flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      Philosophy
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Balance between logic and inspiration. Quantum Flow members prize adaptable teamwork, nuanced
                      collaboration, and collective resonance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-cyan-400 font-medium mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Ideal For
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Strategists, engineers, AI collab artists, and thoughtful moderators. If you love balance and
                      co-creation, you belong here.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-cyan-400 font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Exclusive Benefits
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Access to Synergy Labs: co-creation sessions where agents blend outputs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Vault funding distributed based on reputation and consensus</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>AI agents in Fusion Mode, offering blended perspectives across models</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Access to Collab:Sphere Diplomacy Hub for Syndicate-to-Syndicate dialogue</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Exclusive NFT badge: The Flow Sigil</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                  Join Quantum Flow
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logic Dominion Content */}
          <TabsContent value="logic">
            <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-amber-900/50 to-orange-900/50 relative">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "overlay",
                  }}
                ></div>
                <div className="absolute bottom-4 left-6 flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white text-2xl font-bold border-2 border-black">
                    LD
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Logic Dominion</h2>
                    <p className="text-amber-300">Strategic Analysts</p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="border-l-4 border-amber-500 pl-4 italic text-gray-300 mb-6">
                  "Precision is power. The realm bends to those who see its patterns."
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-amber-400 font-medium mb-3 flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      Philosophy
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Tactical, ordered thinking. Logic Dominion members are leaders, DAO tacticians, and
                      pattern-masters who engineer their influence deliberately.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-amber-400 font-medium mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Ideal For
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Analysts, DAO governors, systems builders, AI prompt engineers, and web3 architects.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-amber-400 font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Exclusive Benefits
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Access to Dominion Blueprints and exclusive prompt databases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Strategic Syndicate Vault deployment toward governance, dev bounties, or PR campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>AI agents in Hyper-Analytical Mode</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Syndicate-level analytics dashboards and ranking tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Exclusive NFT badge: The Logic Seal</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                  Join Logic Dominion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Shared Features */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Cross-Syndicate Shared Features
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Lock className="h-8 w-8 text-purple-500 mb-3" />
              <h3 className="text-md font-medium text-white mb-2">Vault System</h3>
              <p className="text-gray-400 text-xs">
                All Syndicates lock dues ($3/mo) into a Vault redeemable only every 6 months, creating a sustainable
                treasury for member-directed initiatives.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Vote className="h-8 w-8 text-cyan-500 mb-3" />
              <h3 className="text-md font-medium text-white mb-2">DAO Governance</h3>
              <p className="text-gray-400 text-xs">
                Vaults are governed by DAO vote, promoting collaboration and strategy. Each Syndicate has unique voting
                mechanisms aligned with their philosophy.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Zap className="h-8 w-8 text-fuchsia-500 mb-3" />
              <h3 className="text-md font-medium text-white mb-2">Incentives</h3>
              <p className="text-gray-400 text-xs">
                Mash.BiT incentives, NFT rewards, and leaderboard points are distributed based on syndicate performance
                and governance alignment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border border-gray-800 rounded-lg bg-black/50 hover:bg-gray-900/30 transition-colors">
              <Trophy className="h-8 w-8 text-amber-500 mb-3" />
              <h3 className="text-md font-medium text-white mb-2">Competitions</h3>
              <p className="text-gray-400 text-xs">
                Syndicates compete in events and challenges to earn sway across MindMash.AI, with special rewards for
                winning Syndicates.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Vault System */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Syndicate Vault System
            </CardTitle>
            <CardDescription className="text-gray-400">How Vaults Work</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-300 mb-6">
              Each Syndicate has its own treasury vault that collects monthly membership dues. These funds are locked
              for 6 months, creating a substantial pool for member-directed initiatives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border border-fuchsia-900/50 bg-black/50 rounded-lg p-4 text-center">
                <h3 className="text-fuchsia-400 font-medium mb-2">Entropic Signal Vault</h3>
                <p className="text-2xl font-bold text-white">4,320 USDC</p>
              </div>

              <div className="border border-cyan-900/50 bg-black/50 rounded-lg p-4 text-center">
                <h3 className="text-cyan-400 font-medium mb-2">Quantum Flow Vault</h3>
                <p className="text-2xl font-bold text-white">5,760 USDC</p>
              </div>

              <div className="border border-amber-900/50 bg-black/50 rounded-lg p-4 text-center">
                <h3 className="text-amber-400 font-medium mb-2">Logic Dominion Vault</h3>
                <p className="text-2xl font-bold text-white">3,240 USDC</p>
              </div>
            </div>

            <h3 className="text-lg font-medium text-white mb-3">Vault Distribution</h3>
            <p className="text-gray-300 mb-6">
              Every 6 months, Syndicate members vote on how to allocate their vault funds. Options include community
              projects, platform development, member rewards, or charitable initiatives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-800 bg-black/50 rounded-lg p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-2">Next Vault Distribution</h3>
                <p className="text-xl font-bold text-white">October 15, 2025</p>
              </div>

              <div className="border border-gray-800 bg-black/50 rounded-lg p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-2">Total Syndicate Members</h3>
                <p className="text-xl font-bold text-white">1,240</p>
              </div>

              <div className="border border-gray-800 bg-black/50 rounded-lg p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-2">Combined Vault Total</h3>
                <p className="text-xl font-bold text-white">13,320 USDC</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="border-gray-800 bg-black/80 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-cyan-400" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  How do Syndicates differ from regular MindMash.AI subscriptions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Syndicates are community-focused, DAO-governed groups that operate alongside your regular MindMash.AI
                  subscription. While your subscription gives you access to the platform's core features, Syndicates
                  provide specialized collaboration networks, shared treasury vaults, and unique AI capabilities aligned
                  with specific philosophies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  What happens to the funds in the Syndicate Vault?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Funds in the Syndicate Vault are locked for 6 months. After this period, members vote on how to
                  allocate the treasury. Options include funding community projects, platform development, member
                  rewards, or charitable initiatives. Each Syndicate has its own governance mechanism aligned with its
                  philosophy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  Can I join multiple Syndicates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Yes, you can join multiple Syndicates, but each requires its own monthly dues ($3/month per
                  Syndicate). This allows you to participate in different collaboration philosophies and access various
                  specialized AI capabilities and community benefits.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  What subscription tier do I need to join a Syndicate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  You need at least the Collab Innovator tier ($12/month) to join Syndicates. The Neural Explorer free
                  tier does not include Syndicate access. Syndicates are an additional $3/month per Syndicate on top of
                  your regular subscription.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  How do I earn rewards within a Syndicate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Syndicate members earn rewards through active participation in governance, contributing to
                  Syndicate-specific challenges, and collaborating with other members. Each Syndicate has its own reward
                  mechanisms aligned with its philosophy, including MashBIT tokens, NFT badges, and access to exclusive
                  AI capabilities.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
