import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { MultiSelect } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "@env";

const BASE_URL = `${API_BASE}`;

export default function ServiceSelection({
  // parent passes an array of {id,title,price}
  selectedServices = [],
  onSelectServices,
  selectedOffer, // { discount_percentage, ... }
  prefillServiceName,
  preselectedServices, // [{id,title,price}] from promo (optional)
  lockedServiceIds = [], // array of numeric IDs that must remain selected / locked
  lockSelected = false, // boolean: whether auto-selected services are locked
}) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Fetch services list
  useEffect(() => {
    let cancelled = false;
    const fetchServices = async () => {
      try {
        const token = await AsyncStorage.getItem("access");
        if (!token) {
          console.log("ServiceSelection: no token");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${BASE_URL}/api/services/?no_pagination=true`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (cancelled) return;

        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        const formatted = data.map((item) => {
          let label = `${item.title} (₹${item.price})`;

          if (selectedOffer?.discount_percentage > 0) {
            const discountedPrice = Math.round(
              item.price * (1 - selectedOffer.discount_percentage / 100)
            );
            label += ` → ₹${discountedPrice} (${selectedOffer.discount_percentage}% off)`;
          }

          return {
            label,
            value: Number(item.id),
            price: item.price,
            title: item.title,
          };
        });

        setServices(formatted);
        console.log("ServiceSelection: Services fetched:", formatted);
      } catch (err) {
        console.log("ServiceSelection: Error fetching services:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      cancelled = true;
    };
  }, [selectedOffer]);

  // Auto-select logic (runs once after services load)
  useEffect(() => {
    if (loading || services.length === 0 || initialized) return;

    console.log("ServiceSelection: Running auto-select once");

    let idsToSelect = [];

    // 1) preselectedServices (explicit)
    if (preselectedServices?.length > 0) {
      idsToSelect = preselectedServices.map((s) => Number(s.id));
      console.log("ServiceSelection: using preselectedServices ->", idsToSelect);
    }
    // 2) prefill by name
    else if (prefillServiceName) {
      const match = services.find(
        (s) =>
          s.title.toLowerCase().trim() === prefillServiceName.toLowerCase().trim()
      );
      if (match) {
        idsToSelect = [Number(match.value)];
        console.log("ServiceSelection: prefill matched ->", idsToSelect);
      }
    }
    // 3) selectedServices from parent (edit flow)
    else if (selectedServices?.length > 0) {
      idsToSelect = selectedServices.map((s) => Number(s.id));
      console.log("ServiceSelection: using parent selectedServices ->", idsToSelect);
    }

    // Ensure numbers
    idsToSelect = idsToSelect.map((id) => Number(id));

    // Ensure lockedServiceIds are included (if locking enabled)
    if (lockSelected && lockedServiceIds?.length > 0) {
      const lockedNums = lockedServiceIds.map((id) => Number(id));
      idsToSelect = Array.from(new Set([...idsToSelect, ...lockedNums]));
    }

    setSelectedValues(idsToSelect);

    const selectedDetails = services
      .filter((s) => idsToSelect.includes(Number(s.value)))
      .map((s) => ({ id: Number(s.value), title: s.title, price: s.price }));

    console.log("ServiceSelection: FINAL selectedDetails ->", selectedDetails);
    onSelectServices(selectedDetails);

    setInitialized(true);
  }, [loading, services]);

  // onChange handler: prevents removing locked services
  const handleChange = (items) => {
    // items may be array of numbers or strings; normalize to numbers
    const numericItems = items.map((i) => Number(i));

    // If lock is enabled, ensure lockedServiceIds remain present
    let finalItems = [...numericItems];
    if (lockSelected && lockedServiceIds?.length > 0) {
      lockedServiceIds.forEach((lid) => {
        if (!finalItems.includes(Number(lid))) {
          finalItems.push(Number(lid)); // re-add locked
        }
      });
    }

    // Deduplicate
    finalItems = Array.from(new Set(finalItems));

    setSelectedValues(finalItems);

    const selectedDetails = services
      .filter((s) => finalItems.includes(Number(s.value)))
      .map((s) => ({ id: Number(s.value), title: s.title, price: s.price }));

    console.log("ServiceSelection: MultiSelect changed ->", selectedDetails);
    onSelectServices(selectedDetails);
  };

  if (loading) {
    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading services...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Select Services</Text>

      {lockSelected && lockedServiceIds?.length > 0 && (
        <Text style={styles.lockNote}>
          Auto-selected promotion services are locked and cannot be removed.
        </Text>
      )}

      <MultiSelect
        style={styles.dropdown}
        data={services}
        labelField="label"
        valueField="value"
        placeholder="Choose services"
        value={selectedValues}
        onChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  lockNote: {
    color: "#b91c1c",
    marginBottom: 6,
    fontSize: 13,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});









// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import axios from "axios";
// import { MultiSelect } from "react-native-element-dropdown";
// import { API_BASE } from '@env';
// export default function ServiceSelection({ selectedServices = [], onSelectServices, selectedOffer, prefillServiceName, }) {


//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedValues, setSelectedValues] = useState(selectedServices.map(s => s.id));// ✅ array for multi-select

//   // ⭐ FETCH ALL SERVICES
//   useEffect(() => {
//     axios
//       .get(`${API_BASE}/services/?no_pagination=true`)
//       .then((res) => {
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.results || [];

//         const formatted = data.map((item) => {
//           let label = `${item.title} (₹${item.price})`;

//           // Add discounted price for flexible offers
//           if (selectedOffer?.offer_type === "flexible") {
//             const discountedPrice = (
//               item.price *
//               (1 - selectedOffer.discount_percentage / 100)
//             ).toFixed(0);
//             label += ` → ₹${discountedPrice} (${selectedOffer.discount_percentage}% off)`;
//           }

//           return {
//             label,
//             value: item.id,
//             price: item.price,
//             title: item.title,
//           };
//         });

//         setServices(formatted);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("Error fetching services:", err);
//         setLoading(false);
//       });
//   }, [selectedOffer]); // Re-run if the offer changes

//   // ⭐ AUTO UPDATE DROPDOWN WHEN PARENT UPDATES SERVICES (OFFER AUTO-SELECT)
//   useEffect(() => {
//     setSelectedValues(selectedServices.map((s) => s.id));
//   }, [selectedServices]);
// }, []);


// useEffect(() => {
//   if (!loading && prefillServiceName) {
//     const matched = services.find(
//       (s) => s.title.toLowerCase() === prefillServiceName.toLowerCase()
//     );
//     if (matched) {
//       setSelectedValues([matched.value]);
//       onSelectServices([
//         { id: matched.value, title: matched.title, price: matched.price },
//       ]);
//     }
//   }
// }, [loading, prefillServiceName, services]);
// const handleSelect = (items) => {
//   setSelectedServices(items);
//   const selectedDetails = services.filter((s) => items.includes(s.value));
//   onSelectService(selectedDetails); // ✅ Pass selected services array to parent
//   console.log("✅ Selected services:", selectedDetails);
// };

// if (loading) {
//   return (
//     <View style={{ marginTop: 20, alignItems: "center" }}>
//       <ActivityIndicator size="large" />
//       <Text>Loading services...</Text>
//     </View>
//   );
// }

// return (
//   <View>
//     <Text style={styles.sectionTitle}>Select Services</Text>

//     {loading ? (
//       <View style={{ marginTop: 20, alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//         <Text>Loading services...</Text>
//       </View>
//     ) : (
//       <MultiSelect
//         style={styles.dropdown}
//         data={services}
//         labelField="label"
//         valueField="value"
//         placeholder="Choose services"
//         value={selectedValues}
//         onChange={(items) => {
//           setSelectedValues(items);

//           const selectedDetails = services
//             .filter((s) => items.includes(s.value))
//             .map((s) => ({
//               id: s.value,
//               title: s.title,
//               price: s.price,
//             }));

//           onSelectServices(selectedDetails);
//         }}
//       />
//     )}
//   </View>
// );


// const styles = StyleSheet.create({
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     backgroundColor: "#fff",
//     marginBottom: 20,
//   },
//   dropdownContainer: {
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//     elevation: 6,
//   },
//   placeholderText: {
//     color: "#888",
//     fontSize: 16,
//   },
//   selectedText: {
//     fontSize: 16,
//     color: "#000",
//   },
// });

