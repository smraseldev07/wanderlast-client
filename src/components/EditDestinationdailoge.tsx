"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, SquarePen, Trash2 } from "lucide-react";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Honeymoon",
];

interface EditableDestination {
  _id: string;
  name: string;
  country: string;
  category?: string;
  price: string | number;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
}

const EditDestinationdailoge = ({
  destination,
}: {
  destination: EditableDestination;
}) => {
  const [form, setForm] = useState({
    name: destination.name || "",
    country: destination.country || "",
    price: String(destination.price ?? ""),
    duration: destination.duration || "",
    departureDate: destination.departureDate || "",
    imageUrl: destination.imageUrl || "",
    description: destination.description || "",
  });
  const [category, setCategory] = useState(
    destination.category || categories[0]
  );
  // Keep the dialog uncontrolled; close it imperatively after a successful save.
  // (Controlling `open` and toggling between controlled/uncontrolled makes base-ui
  // warn: "A component is changing the uncontrolled state of openProp…".)
  const actionRef = useRef<{ unmount: () => void; close: () => void } | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, category, id: destination._id };
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        setError(`The server rejected the update (HTTP ${res.status}).`);
        return;
      }

      await res.json();
      actionRef.current?.close();
      // Re-render the server-rendered detail page with the updated data.
      router.refresh();
    } catch {
      setError(
        "Couldn't save — make sure the API server is running on http://localhost:5000."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog actionsRef={actionRef}>
      {/* The form must live INSIDE DialogContent: the content is portaled to
          <body>, so a form wrapping the portal does not own the submit button
          in the DOM and handleSubmit would never fire. */}
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <SquarePen />
            Edit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field className="mt-6">
              <Input
                id="edit-name"
                name="name"
                aria-label="Destination name"
                placeholder="Bali Paradise"
                className="h-9"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  name="country"
                  placeholder="Indonesia"
                  className="h-9"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as string)}>
                  <SelectTrigger id="edit-category" className="h-9 w-full">
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
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-price">Price (USD)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="e.g., 1299"
                  className="h-9"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  className="h-9"
                  value={form.duration}
                  onChange={(e) => update("duration", e.target.value)}
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="edit-departure-date">Departure Date</Label>
              <Input
                id="edit-departure-date"
                name="departureDate"
                type="date"
                className="h-9"
                value={form.departureDate}
                onChange={(e) => update("departureDate", e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="edit-image-url">Image URL</Label>
              <Input
                id="edit-image-url"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="h-9"
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={5}
                placeholder="Describe the travel experience..."
                className="min-h-28"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </Field>
          </FieldGroup>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 />
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={saving}
              className="bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <Save />
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationdailoge;
