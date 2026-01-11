import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null); // object or null
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      setServices([]);
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://local-household-service-server.vercel.app/services", {
          params: { providerEmail: user.email },
        });
        setServices(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user?.email]);

  const handleDelete = (serviceId) => {
    Swal.fire({
      title: "Delete service?",
      text: "This will permanently remove the service.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await axios.delete(
          `https://local-household-service-server.vercel.app/services/${serviceId}`,
          { params: { providerEmail: user.email } }
        );

        if (res.data.success) {
          setServices((prev) => prev.filter((s) => s._id !== serviceId));
          toast.success("Service deleted");
        } else {
          toast.error(res.data.error || "Delete failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    });
  };

  const openEditModal = (service) => {
    // shallow copy avoid direct mutation
    setEditingService({ ...service });
  };

  const closeEditModal = () => {
    setEditingService(null);
  };

  const handleEditChange = (field, value) => {
    setEditingService((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    try {
      // include providerEmail in the body for ownership check on server
      const payload = {
        Email: user.email,
        Service: editingService.Service,
        Category: editingService.Category,
        Price: editingService.Price,
        Description: editingService.Description,
        Image: editingService.Image,
        tags: editingService.tags || [],
      };

      const res = await axios.put(
        `https://local-household-service-server.vercel.app/services/${editingService._id}`,
        payload
      );

      if (res.data.success) {
        // update local copy
        setServices((prev) =>
          prev.map((s) => (s._id === editingService._id ? { ...s, ...payload } : s))
        );
        toast.success("Service updated");
        closeEditModal();
      } else {
        toast.error(res.data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 w-11/12 mx-auto">
      <h1 className="text-3xl  mb-4 text-center font-bold text-teal-500">My Services</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="loader border-t-4 border-teal-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You have no services yet. Add one from Add Service page.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-600 ">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider hidden md:table-cell">Description</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap flex items-center gap-3">
                    <img src={s.Image} alt={s.Service} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{s.Service}</div>
                      <div className="text-xs text-gray-400">{s.providerName || s.providerEmail}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-700">{s.Category || "-"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-semibold text-green-500">${s.Price ?? "-"}</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-600 line-clamp-2">{s.Description}</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="px-3 py-1 rounded-md cursor-pointer bg-green-600 text-white text-sm hover:bg-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="px-3 cursor-pointer py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={closeEditModal} />
            <motion.form
              onSubmit={handleSave}
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10"
            >
              <h2 className="text-lg font-semibold mb-4 text-blue-400">Edit Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600">Service Title</label>
                  <input
                    value={editingService.Service}
                    onChange={(e) => handleEditChange("Service", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600">Category</label>
                  <input
                    value={editingService.Category || ""}
                    onChange={(e) => handleEditChange("Category", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600">Price</label>
                  <input
                    type="number"
                    value={editingService.Price ?? ""}
                    onChange={(e) => handleEditChange("Price", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600">Image URL</label>
                  <input
                    value={editingService.Image || ""}
                    onChange={(e) => handleEditChange("Image", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600">Description</label>
                  <textarea
                    value={editingService.Description || ""}
                    onChange={(e) => handleEditChange("Description", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-black"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={closeEditModal} className="px-4 py-2 cursor-pointer bg-red-500  text-white rounded-md"> 
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-md bg-indigo-600 cursor-pointer text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyServices;
