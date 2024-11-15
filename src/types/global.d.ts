interface Window {
  bitcoin?: {
    request: (args: any) => Promise<any>;
  };
}