"use client";

import { FC, useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  ModalFooter,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import {
  SheetParser,
  ParsedData,
  SheetParserOptions,
} from "@/utils/sheetParser";

interface DataInputProps {
  onDataAvailable: (data: ParsedData) => void;
  options?: SheetParserOptions;
  headers?: string[];
}

export const DataInput: FC<DataInputProps> = ({
  onDataAvailable,
  options,
  headers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manualData, setManualData] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleError = (error: Error) => {
    toast({
      title: "Error processing data",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const processData = (data: ParsedData) => {
    onDataAvailable(data);
    toast({
      title: "Success",
      description: "Data processed successfully",
      status: "success",
      duration: 3000,
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const data = await SheetParser.parseFile(file, {
        ...options,
        headerRow: headers,
      });
      processData(data);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    setIsLoading(true);
    try {
      const text = await navigator.clipboard.readText();
      if (!text.trim()) {
        throw new Error("Clipboard is empty");
      }

      const data = SheetParser.parsePastedData(text, {
        ...options,
        headerRow: headers,
      });
      processData(data);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualDataSubmit = () => {
    try {
      if (!manualData.trim()) {
        throw new Error("Please enter some data");
      }

      const data = SheetParser.parsePastedData(manualData, {
        ...options,
        headerRow: headers,
      });
      processData(data);
      onClose();
      setManualData("");
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Box w="full">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Quick Paste</Tab>
          <Tab>Upload File</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              <HStack spacing={4}>
                <Button
                  colorScheme="blue"
                  onClick={handlePasteFromClipboard}
                  isLoading={isLoading}
                  leftIcon={<ClipboardIcon />}
                >
                  Paste from Clipboard
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  onClick={onOpen}
                  leftIcon={<EditIcon />}
                >
                  Manually Enter Data
                </Button>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                Copy data from Excel or Google Sheets first
              </Text>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <Button
                as="label"
                htmlFor="file-upload"
                colorScheme="blue"
                isLoading={isLoading}
                cursor="pointer"
              >
                Choose Excel File
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </Button>
              <Text fontSize="sm" color="gray.500">
                Supported formats: .xlsx, .xls, .csv
              </Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Data Manually</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2} fontSize="sm" color="gray.600">
              Enter or paste your data here. First row should contain headers.
            </Text>
            <Textarea
              value={manualData}
              onChange={(e) => setManualData(e.target.value)}
              placeholder="Name  Age  City
John  25   New York
Jane  30   London"
              rows={10}
              fontFamily="monospace"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleManualDataSubmit}>
              Process Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const ClipboardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default DataInput;
