module.exports = {
    apps : [
      // Production environment configuration
      {
        name: 'FunnyMovie BE (Prod)',
        script: 'src/index.js', // Entry point of your application
        instances: 'max', // Scale the application based on available CPUs
        exec_mode: 'cluster', // Use cluster mode for better performance
        env: {
          NODE_ENV: 'production'
        },
        // Additional production-specific options
      }
    ]
  };
  