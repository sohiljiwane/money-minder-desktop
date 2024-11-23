import React, { useState, KeyboardEvent } from "react";
import {
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Hash,
  Type,
  Eye,
} from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { ExpenseFormData } from "./types/EditExpense";
import SidebarLayout from "../../components/common/SidebarLayout";

const EditExpense: React.FC<ExpenseFormData> = () => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    type: "Expense",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const categories = {
    Expense: [
      "Food & Dining",
      "Transportation",
      "Shopping",
      "Bills & Utilities",
      "Entertainment",
      "Healthcare",
      "Other",
    ],
    Investment: [
      "Stocks",
      "Bonds",
      "Real Estate",
      "Cryptocurrency",
      "Mutual Funds",
      "Fixed Deposit",
      "Other",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }),
    }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        const newTag = tagInput.trim().startsWith("#")
          ? tagInput.trim()
          : `#${tagInput.trim()}`;
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const resetForm = () => {
    setFormData({
      type: "Expense",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      tags: [],
    });
    setTagInput("");
  };

  const PreviewSection = () => (
    <div className="bg-emerald-50 p-6 rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-emerald-800 mb-4">Preview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <span className="text-emerald-600 font-medium">Type:</span>
            <span className="text-gray-700">{formData.type}</span>
          </div>
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <span className="text-emerald-600 font-medium">Amount:</span>
            <span className="text-gray-700">
              $
              {Number(formData.amount || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <span className="text-emerald-600 font-medium">Category:</span>
            <span className="text-gray-700">
              {formData.category || "Not selected"}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <span className="text-emerald-600 font-medium">Date:</span>
            <span className="text-gray-700">
              {new Date(formData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="border-b border-emerald-100 pb-2">
            <span className="text-emerald-600 font-medium">Tags:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.length > 0 ? (
                formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 italic">No tags added</span>
              )}
            </div>
          </div>
          <div>
            <span className="text-emerald-600 font-medium">Description:</span>
            <p className="mt-2 text-gray-700 whitespace-pre-wrap">
              {formData.description || "No description provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-emerald-50 w-inherit">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-emerald-600 text-white p-6 rounded-t-lg">
            <h1 className="text-3xl font-bold">Add New {formData.type}</h1>
            <p className="mt-2 text-emerald-100">
              Enter the details below to record your{" "}
              {formData.type.toLowerCase()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-b-lg shadow-lg">
            {showSuccess && (
              <Alert className="mb-6 bg-emerald-100 text-emerald-800 border-emerald-200">
                <AlertDescription>
                  {formData.type} successfully added!
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type Selection */}
                  <div className="relative">
                    <Type className="absolute left-3 top-2.5 h-5 w-5 text-emerald-600" />
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="pl-10 w-full h-10 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="Expense">Expense</option>
                      <option value="Investment">Investment</option>
                    </select>
                  </div>

                  {/* Amount Input */}
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-emerald-600" />
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="pl-10 w-full h-10 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="relative">
                    <Tag className="absolute left-3 top-2.5 h-5 w-5 text-emerald-600" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="pl-10 w-full h-10 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories[formData.type].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Input */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-emerald-600" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="pl-10 w-full h-10 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Tags Input */}
                <div className="space-y-2">
                  <div className="relative">
                    <Hash className="absolute left-3 top-2.5 h-5 w-5 text-emerald-600" />
                    <input
                      type="text"
                      placeholder="Add tags (press Enter or Space)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      className="pl-10 w-full h-10 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-emerald-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description Input */}
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 h-5 w-5 text-emerald-600" />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="pl-10 w-full h-32 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-1/3 py-2 px-4 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                  >
                    Add {formData.type}
                  </button>
                </div>
              </form>

              <div className="hidden lg:block">
                <PreviewSection />
              </div>
            </div>

            {/* Mobile Preview Toggle */}
            <div className="lg:hidden mt-6">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="w-full py-2 px-4 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              {showPreview && (
                <div className="mt-6">
                  <PreviewSection />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default EditExpense;
