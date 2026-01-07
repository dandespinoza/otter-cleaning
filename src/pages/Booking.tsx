import { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Bed,
  Bath,
  Sparkles,
  CreditCard,
  Tag,
  Key,
  Home,
  Smartphone,
  MessageSquare,
  ChevronDown,
  Info
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedPrice } from "@/components/AnimatedPrice";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const timeSlots = [
  "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Pricing rates by cleaning type
// Formula: Base Price + (Bedrooms × Per Room Rate) + ((Bathrooms - 1) × Per Room Rate)
const serviceTypes = [
  { id: "standard", label: "Standard", base: 110, perRoom: 41.50, description: "Core maintenance clean" },
  { id: "standard-plus", label: "Standard Plus", base: 150, perRoom: 45.00, description: "Enhanced essentials" },
  { id: "deep", label: "Deep Clean", base: 291, perRoom: 58.00, description: "Full reset" },
  { id: "move", label: "Move In/Out", base: 291, perRoom: 58.00, description: "Turnover ready" },
];

const frequencies = [
  { id: "one-time", label: "One Time", discount: 0 },
  { id: "weekly", label: "Weekly", discount: 10 },
  { id: "bi-weekly", label: "Bi-Weekly", discount: 7 },
  { id: "monthly", label: "Monthly", discount: 5 },
];

// Add-on services with flat fees
const addOns = [
  { id: "fridge", label: "Inside Fridge", price: 45, unit: "per unit" },
  { id: "oven", label: "Inside Oven", price: 45, unit: "per oven" },
  { id: "cabinets", label: "Inside Cabinets", price: 45, unit: "flat rate" },
  { id: "windows", label: "Interior Windows", price: 60, unit: "flat rate" },
  { id: "laundry", label: "Laundry", price: 45, unit: "per load" },
  { id: "balcony", label: "Balcony", price: 60, unit: "flat rate" },
  { id: "basement", label: "Basement", price: 85, unit: "flat rate" },
  { id: "closets", label: "Closet Organization", price: 50, unit: "flat rate" },
];

const accessMethods = [
  { id: "someone-home", label: "Someone will be home", icon: Home },
  { id: "hidden-key", label: "Hidden key", icon: Key },
  { id: "remote", label: "Remote/smart lock", icon: Smartphone },
  { id: "other", label: "Other (explain below)", icon: MessageSquare },
];

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [serviceType, setServiceType] = useState("standard");
  const [frequency, setFrequency] = useState("one-time");
  const [bedrooms, setBedrooms] = useState(0); // 0 = Studio
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [accessMethod, setAccessMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", apt: "", city: "", zipCode: "",
    accessNotes: "", notes: "", termsAccepted: false,
    cardNumber: "", cardExpiry: "", cardCvc: "", cardName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [step, setStep] = useState(1);

  // Pre-fill form from URL params (from hero section)
  useEffect(() => {
    const bedroomsParam = searchParams.get("bedrooms");
    const bathroomsParam = searchParams.get("bathrooms");
    const zipParam = searchParams.get("zip");

    if (bedroomsParam !== null) {
      const beds = parseInt(bedroomsParam, 10);
      if (!isNaN(beds) && beds >= 0 && beds <= 10) {
        setBedrooms(beds);
      }
    }

    if (bathroomsParam !== null) {
      const baths = parseInt(bathroomsParam, 10);
      if (!isNaN(baths) && baths >= 1 && baths <= 10) {
        setBathrooms(baths);
      }
    }

    if (zipParam) {
      setFormData(prev => ({ ...prev, zipCode: zipParam }));
    }
  }, [searchParams]);

  // Check if add-ons should be disabled (Deep Clean and Move In/Out include these services)
  const addOnsDisabled = serviceType === "deep" || serviceType === "move";

  // Clear selected add-ons when switching to deep/move service
  useMemo(() => {
    if (addOnsDisabled && selectedAddOns.length > 0) {
      setSelectedAddOns([]);
    }
  }, [addOnsDisabled]);

  // Get the selected service type rates
  const selectedService = serviceTypes.find(s => s.id === serviceType);
  const basePrice = selectedService?.base || 110;
  const perRoomRate = selectedService?.perRoom || 41.50;

  // Calculate cleaning price using formula:
  // Price = Base + (Bedrooms × PerRoom) + ((Bathrooms - 1) × PerRoom)
  const cleaningPrice = Math.round(basePrice + (bedrooms * perRoomRate) + ((bathrooms - 1) * perRoomRate));

  // Calculate add-ons total
  const addOnsPrice = addOnsDisabled ? 0 : selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  // Calculate totals
  const frequencyDiscount = frequencies.find(f => f.id === frequency)?.discount || 0;
  const subtotal = cleaningPrice + addOnsPrice;
  const discountAmount = Math.round(subtotal * (frequencyDiscount / 100)) + promoDiscount;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  // Calculate starting price for display (studio/1 bath)
  const startingPrice = Math.round(basePrice + perRoomRate);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressSelect = (components: {
    street: string;
    apt: string;
    city: string;
    state: string;
    zipCode: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      address: components.street,
      apt: components.apt || prev.apt,
      city: components.city,
      zipCode: components.zipCode,
    }));
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "OTTER10") {
      setPromoDiscount(Math.round(subtotal * 0.1));
      setPromoApplied(true);
      toast.success("Promo code applied! 10% off");
    } else if (promoCode.toUpperCase() === "FIRST20") {
      setPromoDiscount(20);
      setPromoApplied(true);
      toast.success("Promo code applied! $20 off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) { toast.error("Please select a date and time"); return; }
    if (!accessMethod) { toast.error("Please select an access method"); return; }
    if (!formData.cardNumber) { toast.error("Please enter payment details"); return; }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
    toast.success("Booking confirmed!");
  };

  const handleBookNow = () => navigate("/booking");

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header onBookNow={handleBookNow} />
        <div className="py-20 px-4">
          <Card className="mx-auto max-w-2xl p-10 text-center shadow-card animate-scale-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-3">Booking Confirmed!</h2>
            <p className="text-lg text-muted-foreground">
              Your cleaning has been scheduled for {date && format(date, "MMMM d, yyyy")} at {time}.
            </p>
            <p className="mt-4 text-muted-foreground">Confirmation email sent to {formData.email}</p>
            <div className="mt-8 rounded-xl bg-muted p-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Charged</span>
                <span className="text-3xl font-bold text-blue">${totalPrice}</span>
              </div>
            </div>
            <div className="mt-8 flex gap-4 justify-center">
              <Button variant="outline" size="lg" onClick={() => navigate("/")}>Back to Home</Button>
              <Button variant="blue" size="lg" onClick={() => { setIsComplete(false); setStep(1); }}>Book Another</Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Book House Cleaning Online - Instant Pricing"
        description="Book professional house cleaning in NYC, Long Island & New Jersey in 60 seconds. Transparent pricing, vetted cleaners, eco-friendly products. Choose from Standard, Deep Clean, or Move In/Out services."
        keywords="book house cleaning, schedule cleaning service, online cleaning booking, instant cleaning quote, book maid service NYC, cleaning appointment Long Island"
        canonicalUrl="/booking"
      />
      <Header onBookNow={handleBookNow} />

      <div className="py-12 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-blue font-medium mb-2">Book in 60 Seconds</p>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-3">Book Your Cleaning</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing, vetted professionals, and a spotless home guaranteed. No hidden fees.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Cleaning Preferences */}
              <Card className="overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue flex items-center justify-center text-primary-foreground font-bold">1</div>
                  <h2 className="text-xl font-semibold text-primary-foreground">Cleaning Preferences</h2>
                </div>
                <div className="p-6 space-y-8">
                  <div>
                    <Label className="text-base font-medium text-navy mb-4 block">Select Your Service</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {serviceTypes.map((type) => {
                        // Calculate starting price for this service (Studio, 1 bath)
                        const typeStartingPrice = Math.round(type.base);
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setServiceType(type.id)}
                            className={cn(
                              "p-5 rounded-xl border-2 text-left transition-all",
                              serviceType === type.id
                                ? "border-blue bg-accent shadow-md"
                                : "border-border bg-card hover:border-muted-foreground"
                            )}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-lg font-semibold text-navy">{type.label}</span>
                              <div className="text-right">
                                <span className="text-lg font-bold text-blue">${typeStartingPrice}</span>
                                <span className="text-xs text-muted-foreground block">starting</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium text-navy mb-4 block">How Often?</Label>
                    <div className="flex flex-wrap gap-3">
                      {frequencies.map((freq) => (
                        <button
                          key={freq.id}
                          type="button"
                          onClick={() => setFrequency(freq.id)}
                          className={cn(
                            "px-6 py-3 rounded-xl border-2 font-medium transition-all",
                            frequency === freq.id
                              ? "border-blue bg-accent text-blue"
                              : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                          )}
                        >
                          {freq.label}
                          {freq.discount > 0 && (
                            <span className="ml-2 text-xs bg-blue/10 text-blue px-2 py-0.5 rounded-full">
                              Save {freq.discount}%
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2: Your Home */}
              <Card className="overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue flex items-center justify-center text-primary-foreground font-bold">2</div>
                  <h2 className="text-xl font-semibold text-primary-foreground">About Your Home</h2>
                </div>
                <div className="p-6 space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Bedrooms Counter */}
                    <div className="border-2 rounded-xl p-6 text-center hover:border-blue/30 transition-colors">
                      <Bed className="h-12 w-12 text-blue mx-auto mb-3" />
                      <p className="text-sm font-medium text-muted-foreground mb-4">Bedrooms</p>
                      <div className="flex items-center justify-center gap-5">
                        <button
                          type="button"
                          onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                          className="h-10 w-10 rounded-full border-2 flex items-center justify-center text-muted-foreground hover:bg-muted hover:border-blue transition-all"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                        <span className={cn("text-3xl font-bold text-navy text-center", bedrooms === 0 ? "min-w-[5rem]" : "w-16")}>{bedrooms === 0 ? "Studio" : bedrooms}</span>
                        <button
                          type="button"
                          onClick={() => setBedrooms(Math.min(10, bedrooms + 1))}
                          className="h-10 w-10 rounded-full border-2 flex items-center justify-center text-muted-foreground hover:bg-muted hover:border-blue transition-all"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Bathrooms Counter */}
                    <div className="border-2 rounded-xl p-6 text-center hover:border-blue/30 transition-colors">
                      <Bath className="h-12 w-12 text-blue mx-auto mb-3" />
                      <p className="text-sm font-medium text-muted-foreground mb-4">Bathrooms</p>
                      <div className="flex items-center justify-center gap-5">
                        <button
                          type="button"
                          onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                          className="h-10 w-10 rounded-full border-2 flex items-center justify-center text-muted-foreground hover:bg-muted hover:border-blue transition-all"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                        <span className="text-3xl font-bold text-navy w-10">{bathrooms}</span>
                        <button
                          type="button"
                          onClick={() => setBathrooms(Math.min(10, bathrooms + 1))}
                          className="h-10 w-10 rounded-full border-2 flex items-center justify-center text-muted-foreground hover:bg-muted hover:border-blue transition-all"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Label className="text-base font-medium text-navy">Add-On Services</Label>
                      {addOnsDisabled && (
                        <div className="flex items-center gap-1.5 text-blue bg-blue/10 px-3 py-1 rounded-full text-sm">
                          <Info className="h-4 w-4" />
                          <span>Included in {serviceType === "deep" ? "Deep Clean" : "Move In/Out"}</span>
                        </div>
                      )}
                    </div>
                    {addOnsDisabled && (
                      <div className="bg-accent border border-blue/20 rounded-xl p-4 mb-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-navy">Great news!</strong> Your selected service tier already includes appliance interiors, cabinet cleaning, interior windows, and more. No add-ons needed.
                        </p>
                      </div>
                    )}
                    <div className={cn("grid sm:grid-cols-2 gap-3", addOnsDisabled && "opacity-50 pointer-events-none")}>
                      {addOns.map((addon) => (
                        <label
                          key={addon.id}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                            addOnsDisabled
                              ? "cursor-not-allowed border-border bg-muted/30"
                              : "cursor-pointer",
                            !addOnsDisabled && selectedAddOns.includes(addon.id)
                              ? "border-blue bg-accent"
                              : !addOnsDisabled && "border-border hover:border-muted-foreground"
                          )}
                        >
                          <Checkbox
                            checked={!addOnsDisabled && selectedAddOns.includes(addon.id)}
                            onCheckedChange={() => !addOnsDisabled && toggleAddOn(addon.id)}
                            disabled={addOnsDisabled}
                            className="h-5 w-5"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-navy block">{addon.label}</span>
                            <span className="text-xs text-muted-foreground">{addon.unit}</span>
                          </div>
                          <span className={cn("font-semibold whitespace-nowrap", addOnsDisabled ? "text-muted-foreground" : "text-blue")}>
                            {addOnsDisabled ? "Included" : `+$${addon.price}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3: Date & Time */}
              <Card className="overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue flex items-center justify-center text-primary-foreground font-bold">3</div>
                  <h2 className="text-xl font-semibold text-primary-foreground">Date & Time</h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-navy">Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start h-14 text-base", !date && "text-muted-foreground")}>
                            <CalendarIcon className="mr-3 h-5 w-5" />
                            {date ? format(date, "EEEE, MMMM d, yyyy") : "Choose a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} className="pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-navy">Start Time</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="h-14 text-base">
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot} className="text-base py-3">
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 4: Access */}
              <Card className="overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue flex items-center justify-center text-primary-foreground font-bold">4</div>
                  <h2 className="text-xl font-semibold text-primary-foreground">Access to Your Home</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <Label className="text-base font-medium text-navy mb-4 block">How will we get in?</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {accessMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setAccessMethod(method.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                            accessMethod === method.id
                              ? "border-blue bg-accent"
                              : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <method.icon className={cn("h-6 w-6", accessMethod === method.id ? "text-blue" : "text-muted-foreground")} />
                          <span className="font-medium text-navy">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {(accessMethod === "hidden-key" || accessMethod === "other") && (
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-navy">
                        {accessMethod === "hidden-key" ? "Where is the key located?" : "Please explain"}
                      </Label>
                      <Textarea 
                        name="accessNotes" 
                        value={formData.accessNotes} 
                        onChange={handleInputChange}
                        placeholder={accessMethod === "hidden-key" ? "Under the mat, lockbox code, etc." : "Describe how we can access your home..."}
                        className="min-h-[100px] text-base"
                      />
                    </div>
                  )}
                </div>
              </Card>

              {/* Step 5: Contact Details */}
              <Card className="overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue flex items-center justify-center text-primary-foreground font-bold">5</div>
                  <h2 className="text-xl font-semibold text-primary-foreground">Your Details</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-base">First Name</Label>
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required className="h-12 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">Last Name</Label>
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required className="h-12 text-base" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-base">Email</Label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">Phone</Label>
                      <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="h-12 text-base" placeholder="(555) 555-5555" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="space-y-2 sm:col-span-2">
                      <Label className="text-base">Street Address</Label>
                      <AddressAutocomplete
                        id="address"
                        value={formData.address}
                        onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))}
                        onAddressSelect={handleAddressSelect}
                        placeholder="Start typing your address..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">Apt/Unit</Label>
                      <Input name="apt" value={formData.apt} onChange={handleInputChange} className="h-12 text-base" placeholder="Optional" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-base">City</Label>
                      <Input name="city" value={formData.city} onChange={handleInputChange} required className="h-12 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">ZIP Code</Label>
                      <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} required className="h-12 text-base" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Special Instructions (optional)</Label>
                    <Textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleInputChange}
                      placeholder="Any specific areas to focus on, pets, parking instructions..."
                      className="min-h-[100px] text-base"
                    />
                  </div>
                </div>
              </Card>

              {/* Step 6: Payment */}
              <Card className="overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue flex items-center justify-center text-primary-foreground font-bold">6</div>
                  <h2 className="text-xl font-semibold text-primary-foreground">Payment</h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Promo Code */}
                  <div className="bg-muted rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Tag className="h-5 w-5 text-blue" />
                      <Label className="text-base font-medium text-navy">Have a promo code?</Label>
                    </div>
                    <div className="flex gap-3">
                      <Input 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                        placeholder="Enter code" 
                        className="h-12 text-base flex-1"
                        disabled={promoApplied}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={applyPromoCode}
                        disabled={promoApplied || !promoCode}
                        className="h-12 px-6"
                      >
                        {promoApplied ? "Applied!" : "Apply"}
                      </Button>
                    </div>
                  </div>

                  {/* Credit Card */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="h-5 w-5 text-blue" />
                      <Label className="text-base font-medium text-navy">Card Details</Label>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-base">Name on Card</Label>
                        <Input 
                          name="cardName" 
                          value={formData.cardName} 
                          onChange={handleInputChange} 
                          placeholder="John Smith"
                          className="h-12 text-base" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base">Card Number</Label>
                        <Input 
                          name="cardNumber" 
                          value={formData.cardNumber} 
                          onChange={handleInputChange} 
                          placeholder="1234 5678 9012 3456"
                          className="h-12 text-base" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-base">Expiry</Label>
                          <Input 
                            name="cardExpiry" 
                            value={formData.cardExpiry} 
                            onChange={handleInputChange} 
                            placeholder="MM/YY"
                            className="h-12 text-base" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-base">CVC</Label>
                          <Input 
                            name="cardCvc" 
                            value={formData.cardCvc} 
                            onChange={handleInputChange} 
                            placeholder="123"
                            className="h-12 text-base" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="pt-4 border-t">
                    <label className="flex items-start gap-4 cursor-pointer">
                      <Checkbox
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, termsAccepted: checked === true }))
                        }
                        className="h-5 w-5 mt-0.5"
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the{" "}
                        <a href="/terms" target="_blank" className="text-blue hover:underline font-medium">Terms & Conditions</a>
                        {" "}and{" "}
                        <a href="/privacy" target="_blank" className="text-blue hover:underline font-medium">Privacy Policy</a>.
                        I understand that my booking is subject to availability and the cancellation policy.
                      </span>
                    </label>
                  </div>

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    variant="red"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold"
                    disabled={isSubmitting || !formData.termsAccepted}
                  >
                    {isSubmitting ? "Processing..." : (
                      <>Complete Booking — <AnimatedPrice value={totalPrice} prefix="$" /></>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-card sticky top-24">
                <div className="bg-navy px-6 py-4">
                  <h3 className="text-xl font-semibold text-primary-foreground">Booking Summary</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Sparkles className="h-5 w-5 text-blue" />
                      <div>
                        <span className="font-semibold text-navy block">
                          {serviceTypes.find(s => s.id === serviceType)?.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {frequencies.find(f => f.id === frequency)?.label}
                        </span>
                      </div>
                    </div>
                    
                    {date && (
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {format(date, "EEE, MMM d")} {time && `at ${time}`}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {bedrooms === 0 ? "Studio" : `${bedrooms} Bed`}, {bathrooms} Bath
                      </span>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium text-navy mb-3">Add-Ons</p>
                        {selectedAddOns.map(id => {
                          const addon = addOns.find(a => a.id === id);
                          return addon ? (
                            <div key={id} className="flex justify-between text-sm text-muted-foreground py-1.5">
                              <span>{addon.label}</span>
                              <span className="font-medium">+${addon.price}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Cleaning ({bedrooms === 0 ? "Studio" : `${bedrooms} bed`}, {bathrooms} bath)</span>
                      <AnimatedPrice value={cleaningPrice} />
                    </div>
                    {addOnsPrice > 0 && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Add-ons</span>
                        <AnimatedPrice value={addOnsPrice} />
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-blue">
                        <span>Discount</span>
                        <AnimatedPrice value={discountAmount} prefix="-$" />
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-lg font-semibold text-navy">Total</span>
                      <AnimatedPrice value={totalPrice} className="text-3xl font-bold text-blue" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
