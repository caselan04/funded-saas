"use client"

import { useState } from "react"
import { Search, ChevronDown, MapPin, Mail, Facebook, Twitter, Linkedin, Users, Building2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FundedSaasDashboard() {
  const [activeView, setActiveView] = useState<"contacts" | "companies">("contacts")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedInvestmentTypes, setSelectedInvestmentTypes] = useState<string[]>([])

  const investmentTypes = [
    "Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D", "Series E",
    "Series F", "Series G", "Series H", "Series I", "Series J", "Venture - Series Unknown",
    "Angel", "Private Equity", "Debt Financing", "Convertible Note", "Grant",
    "Corporate Round", "Equity Crowdfunding", "Product Crowdfunding", "Secondary Market",
    "Post-IPO Equity", "Post-IPO Debt", "Post-IPO Secondary", "Non-equity Assistance"
  ]

  const lastFundingDateOptions = [
    "Past 30 Days", "Past 60 Days", "Past 90 Days", "Past Year"
  ]

  const contacts = [
    {
      id: 1,
      name: "John Smith",
      verified: true,
      position: "CEO & Founder",
      company: "Tech Innovations Inc.",
      investmentType: "Series A",
      lastFundingDate: "2023-05-15",
      location: "San Francisco, United States",
      email: "john.smith@techinnovations.com",
      interests: ["Software", "AI", "Cloud Computing"],
      pastInteractions: ["Email Campaign", "Webinar Attendee", "Product Demo"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      verified: false,
      position: "Marketing Director",
      company: "Global Marketing Solutions",
      investmentType: "Seed",
      lastFundingDate: "2023-09-01",
      location: "New York, United States",
      email: "sarah.j@globalmarketing.com",
      interests: ["Digital Marketing", "Social Media", "Content Strategy"],
      pastInteractions: ["Trade Show", "White Paper Download"],
    },
  ]

  const companies = [
    {
      id: 1,
      name: "Tech Innovations Inc.",
      verified: true,
      industry: "Software",
      investmentType: "Series A",
      lastFundingDate: "2023-05-15",
      totalFunding: "$10M",
      location: "San Francisco, United States",
      website: "www.techinnovations.com",
      products: ["AI Platform", "Cloud Solutions"],
      keyInvestors: ["Sequoia Capital", "Andreessen Horowitz"],
    },
    {
      id: 2,
      name: "Global Marketing Solutions",
      verified: false,
      industry: "Marketing Technology",
      investmentType: "Seed",
      lastFundingDate: "2023-09-01",
      totalFunding: "$2M",
      location: "New York, United States",
      website: "www.globalmarketingsolutions.com",
      products: ["Marketing Automation Tool", "Analytics Dashboard"],
      keyInvestors: ["Y Combinator", "First Round Capital"],
    },
  ]

  const handleItemSelection = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleInvestmentTypeSelection = (type: string) => {
    setSelectedInvestmentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const filteredItems = activeView === "contacts" 
    ? contacts.filter(contact => 
        selectedInvestmentTypes.length === 0 || selectedInvestmentTypes.includes(contact.investmentType)
      )
    : companies.filter(company => 
        selectedInvestmentTypes.length === 0 || selectedInvestmentTypes.includes(company.investmentType)
      )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r flex flex-col">
        <h1 className="text-2xl font-bold mb-8">AngelMatch</h1>
        <nav className="space-y-2 mb-4">
          <button
            className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
              activeView === "contacts" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveView("contacts")}
          >
            <Users size={20} />
            <span>Funded SAAS Contacts</span>
          </button>
          <button
            className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
              activeView === "companies" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveView("companies")}
          >
            <Building2 size={20} />
            <span>Funded SAAS Companies</span>
          </button>
        </nav>
        <div className="flex-grow overflow-y-auto">
          <h2 className="font-semibold mb-2">Investment Type</h2>
          <div className="space-y-2">
            {investmentTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedInvestmentTypes.includes(type)}
                  onCheckedChange={() => handleInvestmentTypeSelection(type)}
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <button className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-100">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {activeView === "contacts" ? "Funded SAAS Contacts" : "Funded SAAS Companies"}
          </h1>
          <Select defaultValue="default-pipeline">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select pipeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default-pipeline">Default pipeline</SelectItem>
              <SelectItem value="sales-pipeline">Sales pipeline</SelectItem>
              <SelectItem value="marketing-pipeline">Marketing pipeline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                type="text"
                placeholder={`Find ${activeView === "contacts" ? "contacts" : "companies"} in your database`}
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="ml-2">Search</Button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                All {activeView === "contacts" ? "Contacts" : "Companies"}: {filteredItems.length}
              </h2>
              <Select defaultValue="15">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 per page</SelectItem>
                  <SelectItem value="30">30 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleItemSelection(item.id)}
                      />
                      <img
                        src={`https://i.pravatar.cc/40?u=${item.id}`}
                        alt={item.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">
                          {item.name} {item.verified && <Badge variant="outline">Verified</Badge>}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activeView === "contacts" 
                            ? `${(item as typeof contacts[0]).position} at ${(item as typeof contacts[0]).company}`
                            : (item as typeof companies[0]).industry
                          }
                        </p>
                      </div>
                    </div>
                    <Button>+ Add to CRM</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>{activeView === "contacts" 
                          ? (item as typeof contacts[0]).email 
                          : (item as typeof companies[0]).website}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Facebook className="w-4 h-4" />
                        <Twitter className="w-4 h-4" />
                        <Linkedin className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">Investment type:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="secondary">{item.investmentType}</Badge>
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">Last funding date:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline">{item.lastFundingDate}</Badge>
                        </div>
                      </div>
                      {activeView === "contacts" ? (
                        <>
                          <div className="mb-2">
                            <span className="text-sm font-medium">Interests:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(item as typeof contacts[0]).interests.map((interest) => (
                                <Badge key={interest} variant="outline">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Past interactions:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(item as typeof contacts[0]).pastInteractions.map((interaction) => (
                                <Badge key={interaction} variant="outline">
                                  {interaction}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-2">
                            <span className="text-sm font-medium">Total funding:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <Badge variant="outline">{(item as typeof companies[0]).totalFunding}</Badge>
                            </div>
                          </div>
                          <div className="mb-2">
                            <span className="text-sm font-medium">Products:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(item as typeof companies[0]).products.map((product) => (
                                <Badge key={product} variant="outline">
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Key investors:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(item as typeof companies[0]).keyInvestors.map((investor) => (
                                <Badge key={investor} variant="outline">
                                  {investor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}