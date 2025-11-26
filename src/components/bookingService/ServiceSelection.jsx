import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { MultiSelect } from "react-native-element-dropdown";
import { API_BASE } from "@env";

export default function ServiceSelection({
  selectedServices = [],
  onSelectServices,
  selectedOffer,
  prefillServiceName,
}) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Selected values for multiselect
  const [selectedValues, setSelectedValues] = useState(
    selectedServices.map((s) => s.id)
  );

  // ⭐ FETCH ALL SERVICES
  useEffect(() => {
    axios
      .get(`${API_BASE}/services/?no_pagination=true`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];


        const formatted = data.map((item) => {
          let label = `${item.title} (₹${item.price})`;

          // Handle flexible offer discount
          if (selectedOffer?.offer_type === "flexible") {
            const discountedPrice = (
              item.price *
              (1 - selectedOffer.discount_percentage / 100)
            ).toFixed(0);

            label += ` → ₹${discountedPrice} (${selectedOffer.discount_percentage}% off)`;
          }

          return {
            label,
            value: item.id,
            price: item.price,
            title: item.title,
          };
        });

        setServices(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching services:", err);
        setLoading(false);
      });


  }, [selectedOffer]);

  // ⭐ Auto-update when parent changes selected services
  useEffect(() => {
    setSelectedValues(selectedServices.map((s) => s.id));
  }, [selectedServices]);

  // ⭐ Prefill single service (if passed)
  useEffect(() => {
    if (!loading && prefillServiceName) {
      const matched = services.find(
        (s) => s.title.toLowerCase() === prefillServiceName.toLowerCase()
      );


      if (matched) {
        setSelectedValues([matched.value]);
        onSelectServices([
          { id: matched.value, title: matched.title, price: matched.price },
        ]);
      }
    }


  }, [loading, prefillServiceName, services]);

  if (loading) {
    return (
      <View style={{ marginTop: 20, alignItems: "center" }}> <ActivityIndicator size="large" /> <Text>Loading services...</Text> </View>
    );
  }

  return (<View> <Text style={styles.sectionTitle}>Select Services</Text>


    <MultiSelect
      style={styles.dropdown}
      data={services}
      labelField="label"
      valueField="value"
      placeholder="Choose services"
      value={selectedValues}
      onChange={(items) => {
        setSelectedValues(items);

        const selectedDetails = services
          .filter((s) => items.includes(s.value))
          .map((s) => ({
            id: s.value,
            title: s.title,
            price: s.price,
          }));

        onSelectServices(selectedDetails);
      }}
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

