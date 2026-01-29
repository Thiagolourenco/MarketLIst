import { BottomSheet } from "@/src/core/ui/BottomSheet";
import {
  AddCircleGreenIcon,
  AddCircleIcon,
  PaperclipIcon,
} from "@/src/core/ui/icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryItem {
  id: string;
  name: string;
  quantity: string;
}

interface Category {
  id: string;
  name: string;
  items: CategoryItem[];
}

interface CreateListBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onCreateList: (listName: string, categories: Category[]) => void;
}

export function CreateListBottomSheet({
  visible,
  onClose,
  onCreateList,
}: CreateListBottomSheetProps) {
  const [listName, setListName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemInputs, setItemInputs] = useState<
    Record<string, { name: string; quantity: string }>
  >({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      setIsAddingCategory(true);
      return;
    }

    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: newCategoryName.trim().toUpperCase(),
      items: [],
    };
    setCategories([...categories, newCategory]);
    setItemInputs({
      ...itemInputs,
      [newCategory.id]: { name: "", quantity: "" },
    });
    setNewCategoryName("");
    setIsAddingCategory(false);
  };

  const handleCancelAddCategory = () => {
    setNewCategoryName("");
    setIsAddingCategory(false);
  };

  const handleAddItem = (categoryId: string) => {
    const input = itemInputs[categoryId];
    if (!input?.name.trim()) return;

    const newItem: CategoryItem = {
      id: `item-${Date.now()}`,
      name: input.name.trim(),
      quantity: input.quantity.trim() || "1",
    };

    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, newItem] }
          : cat,
      ),
    );

    setItemInputs({
      ...itemInputs,
      [categoryId]: { name: "", quantity: "" },
    });
  };

  const handleItemInputChange = (
    categoryId: string,
    field: "name" | "quantity",
    value: string,
  ) => {
    setItemInputs({
      ...itemInputs,
      [categoryId]: {
        ...(itemInputs[categoryId] || { name: "", quantity: "" }),
        [field]: value,
      },
    });
  };

  const handleCreateList = () => {
    if (!listName.trim()) {
      // TODO: Mostrar erro de validação
      return;
    }

    onCreateList(listName.trim(), categories);
    handleClose();
  };

  const handleClose = () => {
    setListName("");
    setCategories([]);
    setItemInputs({});
    setNewCategoryName("");
    setIsAddingCategory(false);
    onClose();
  };

  const renderCategory = ({ item: category }: { item: Category }) => (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <TouchableOpacity>
          <Text style={styles.moreDots}>⋯</Text>
        </TouchableOpacity>
      </View>

      {category.items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <PaperclipIcon width={12} height={24} color="#E5E7EB" />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
        </View>
      ))}

      <View style={styles.addItemContainer}>
        <TouchableOpacity
          style={styles.addItemIcon}
          onPress={() => handleAddItem(category.id)}
        >
          <AddCircleIcon width={24} height={24} color="#22C55E" />
        </TouchableOpacity>
        <TextInput
          style={styles.addItemInput}
          value={itemInputs[category.id]?.name || ""}
          onChangeText={(value) =>
            handleItemInputChange(category.id, "name", value)
          }
          placeholder="Add item..."
          placeholderTextColor="#9CA3AF"
          onSubmitEditing={() => handleAddItem(category.id)}
        />
        <TextInput
          style={styles.quantityInput}
          value={itemInputs[category.id]?.quantity || ""}
          onChangeText={(value) =>
            handleItemInputChange(category.id, "quantity", value)
          }
          placeholder="Qty"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderAddCategory = () => {
    if (isAddingCategory) {
      return (
        <View style={styles.addCategoryInputContainer}>
          <TextInput
            style={styles.addCategoryInput}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            placeholder="Category name..."
            placeholderTextColor="#9CA3AF"
            autoFocus
            onSubmitEditing={handleAddCategory}
          />
          <View style={styles.addCategoryActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelAddCategory}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !newCategoryName.trim() && styles.confirmButtonDisabled,
              ]}
              onPress={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              <Text style={styles.confirmButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.addCategoryButton}
        onPress={() => setIsAddingCategory(true)}
      >
        <AddCircleGreenIcon width={18} height={18} color="#22C55E" />
        <Text style={styles.addCategoryText}>Add Category</Text>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    <>
      {renderAddCategory()}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            !listName.trim() && styles.createButtonDisabled,
          ]}
          onPress={handleCreateList}
          disabled={!listName.trim()}
        >
          <Text style={styles.createButtonText}>Create List</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <BottomSheet visible={visible} onClose={handleClose}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Shopping List</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* List Name - Outside FlatList to avoid re-render issues */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>LIST NAME</Text>
        <TextInput
          style={styles.listNameInput}
          value={listName}
          onChangeText={setListName}
          placeholder="Mid-Week Restock"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        style={{ height: 700 }}
        bounces={true}
        scrollEnabled={true}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
    height: 65,
  },
  headerTitle: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 28,
    color: "#1F2937",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#1F2925",
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 200,
  },
  section: {
    marginBottom: 24,
    marginLeft: 24,
  },
  sectionLabel: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  listNameInput: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    color: "#1F2937",
    paddingVertical: 8,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
    color: "#22C55E",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  moreDots: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 12,
    width: 350,
    height: 45,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemName: {
    flex: 1,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
  },
  itemQuantity: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },
  addItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addItemIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  addItemInput: {
    flex: 1,
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2937",
    borderBottomWidth: 2,
    borderBottomColor: "#22C55E",
    paddingVertical: 8,
  },
  quantityInput: {
    width: 60,
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    marginLeft: 12,
    textAlign: "right",
  },
  addCategoryButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    width: 141.7,
    height: 44,
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    marginBottom: 16,
  },
  addCategoryText: {
    fontFamily: "Nimbus Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: "#22C55E",
  },
  addCategoryInputContainer: {
    marginBottom: 16,
  },
  addCategoryInput: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2925",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  addCategoryActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#34C759",
    borderRadius: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: "#D1D5DB",
    opacity: 0.5,
  },
  confirmButtonText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
    color: "#FFFFFF",
  },
  createButtonContainer: {
    marginTop: 32,
    marginBottom: 100,
  },
  createButton: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  createButtonDisabled: {
    backgroundColor: "#D1D5DB",
    opacity: 0.5,
  },
  createButtonText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
});
