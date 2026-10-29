"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Honeymoon",
];

const emptyForm = {
  name: "",
  country: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type PackageSummary = typeof emptyForm & {
  category: string;
  id: string;
  createdAt: string;
};

export default function AddDestination() {
  const [form, setForm] = useState(emptyForm);
  const [category, setCategory] = useState(categories[0]);
  const [, setPackages] = useState<PackageSummary[]>([]);

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to a real endpoint when the backend exists.
    const payload = {
      ...form,
      category,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    // console.log("Travel package:", payload);
    setPackages((prev) => [payload, ...prev]);
    setForm(emptyForm);
    setCategory(categories[0]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination` , {
        method : "POST",
        headers : {
            "content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    })

    const data = await res.json()
    console.log(data);
    
  }

  function handleCancel() {
    setForm(emptyForm);
    setCategory(categories[0]);
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] px-8 py-16">
      <h1 className="font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-14 w-full max-w-xl">
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-1.5">
              <Label htmlFor="destination-name">Destination Name</Label>
              <Input
                id="destination-name"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Bali Paradise"
                className="h-9"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  required
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  placeholder="Indonesia"
                  className="h-9"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value as string);
                  }}
                >
                  <SelectTrigger id="category" className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  required
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="e.g., 1299"
                  className="h-9"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  required
                  value={form.duration}
                  onChange={(e) => update("duration", e.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="departure-date">Departure Date</Label>
              <Input
                id="departure-date"
                type="date"
                required
                value={form.departureDate}
                onChange={(e) => update("departureDate", e.target.value)}
                className="h-9"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                required
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-9"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                rows={5}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the travel experience..."
                className="min-h-28"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="h-10 border-red-300 px-5 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 />
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-cyan-600 px-5 text-white hover:bg-cyan-700"
              >
                <Plus />
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
