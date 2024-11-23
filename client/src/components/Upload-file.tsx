import { Check, Upload, AlertCircle, CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Dialog from "./ui/Dialog";
import { useAppDispatch } from "../Store";
import { createInvoice } from "../Store/Thunks/invoiceThunks";

const FileUploader = () => {
  const Dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [missingFields, setMissingFields] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (uploading && progress < 90) {
      timer = setTimeout(() => {
        setProgress((prev) => prev + 10);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [progress, uploading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setUploading(true);
      setProgress(0);
      setSuccess(false);
      setMissingFields(null);
      setResponseMessage(null);
      setErrorMessage(null);

      const formdata = new FormData();
      formdata.append("file", selectedFile);

      try {
        const response: any = await Dispatch(createInvoice(formdata)).unwrap();

        if (response?.success) {
          setProgress(100);
          setSuccess(true);
        } else {
          setProgress(90);
        }

        // Display response message
        if (response?.message) {
          setResponseMessage(response.message);
        }

        // Display missing fields if present
        if (response?.data?.missingFields) {
          setMissingFields(response.data.missingFields);
        }
      } catch (error: any) {
        setProgress(90);
        setErrorMessage(
          error?.message || "An unexpected error occurred while uploading."
        );
      } finally {
        setUploading(false);
      }
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);

    setFile(null);
    setProgress(0);
    setUploading(false);
    setSuccess(false);
    setMissingFields(null);
    setResponseMessage(null);
    setErrorMessage(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 
        dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 h-8 px-3"
      >
        <CirclePlus size={16} />
        <span className="font-medium">Add </span>
      </button>

      <Dialog isOpen={isOpen} onClose={handleModalClose} title="Upload File">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".pdf, .xls, .xlsx, .png, .jpeg, .jpg"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {file ? file?.name : "Click to upload"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Allowed formats:{" "}
                  <span className="font-semibold">
                    .pdf, .xls, .xlsx, .png, .jpeg, .jpg
                  </span>
                </span>
              </div>
            </label>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {progress}% uploaded
              </div>
            </div>
          )}

          {success && (
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span>Upload complete!</span>
              </div>
              {missingFields && (
                <div className="text-sm text-red-600 dark:text-red-400">
                  Missing fields: {missingFields}
                </div>
              )}
            </div>
          )}

          {responseMessage && (
            <div className="text-sm text-blue-600 dark:text-blue-400 text-center">
              {responseMessage}
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default FileUploader;
